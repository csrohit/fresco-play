package com.fresco.codelab.service;

import static java.util.stream.Collectors.toMap;

import java.io.BufferedOutputStream;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeMap;
import java.util.function.Consumer;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.fresco.codelab.jms.MergeRequest;
import com.fresco.codelab.model.CodeLabRepo;
import com.fresco.codelab.model.CodeLabRepoVersion;
import com.fresco.codelab.model.CodeLabUser;
import com.fresco.codelab.repo.CodeLabRepoRepository;
import com.fresco.codelab.repo.CodeLabRepoVersionRepository;
import com.fresco.codelab.repo.CodeLabUserRepository;
import com.fresco.codelab.repo.MergeRequestRepository;

@Service
public class DashboardService {
	@Autowired
	CodeLabUserRepository userRepo;
	@Autowired
	CodeLabRepoRepository repoRepo;
	@Autowired
	CodeLabRepoVersionRepository versionRepo;
	@Autowired
	MergeRequestRepository mergeRepo;

	public List<CodeLabRepo> getUserOwnedRepos(Long userId) {
		return repoRepo.findAllByRepoOwnerId(userId);
	}

	public Set<CodeLabRepo> getUserDeveloperRepos(Long userId) {
		return userRepo.findById(userId).get().getRepos();
	}

	public void saveRepo(String repo_name, Long userId) {
		repoRepo.save(
				new CodeLabRepo(repo_name, userId, new ArrayList<CodeLabUser>(), new ArrayList<CodeLabRepoVersion>()));
	}

	public CodeLabRepo getRepoWithRepoIdAndOwnerId(Long repoId, Long userId) {
		return repoRepo.findByRepoAutoGenIdAndRepoOwnerId(repoId, userId);
	}

	public CodeLabRepo getRepoWithRepoIdAndDeveloperId(Long repoId, Long userId) {
		return repoRepo.findByRepoAutoGenIdAndRepoDevelopersUserAutoGenId(repoId, userId);
	}

	public CodeLabRepo getRepoWithRepoIdAndUserId(Long repoId, Long userId) {
		CodeLabRepo repo = getRepoWithRepoIdAndOwnerId(repoId, userId);
		if (repo == null) {
			repo = getRepoWithRepoIdAndDeveloperId(repoId, userId);
		}
		return repo;
	}

	public CodeLabRepo getRepoWithRepoIdAndUserIdAndVersionId(Long repoId, Long userId, Integer version) {
		CodeLabRepo repo = repoRepo.findByRepoAutoGenIdAndRepoOwnerIdAndVersionsVersion(repoId, userId, version);
		if (repo == null)
			repo = repoRepo.findByRepoAutoGenIdAndRepoDevelopersUserAutoGenIdAndVersionsVersion(repoId, userId,
					version);
		return repo;
	}

	public CodeLabUser getUserFromId(Long userId) {
		return userRepo.findById(userId).get();
	}

	public void uploadCode(Long userId, Long repoId, MultipartFile file) {
		try {
			byte[] bytes = file.getBytes();
			CodeLabRepo repo = repoRepo.findById(repoId).get();
			List<Integer> versions = repo.getVersions().parallelStream().map(CodeLabRepoVersion::getVersion)
					.collect(Collectors.toList());
			int latestVersion = versions.size() == 0 ? 1 : Collections.max(versions) + 1;
			Path path = Paths.get("uploads/" + repoId + "-" + latestVersion);
			Files.write(path, bytes);
			unzipFiles(path.toString());
			new File(path.toString()).delete();
//			CodeLabRepoVersion version = versionRepo.findByVersionAndRepo(latestVersion, repo);
//			if (version == null)
			CodeLabRepoVersion version = new CodeLabRepoVersion(Integer.valueOf(latestVersion), repo, userId);
			if(repo.getRepoOwnerId() == userId)
				version.setIsMaster(true);
			versionRepo.save(version);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void extractFile(ZipInputStream zipIn, String filePath){
		try {
			String path = "";
			String[] arr = filePath.split("/");
			for(int i=0; i < arr.length - 1; i++)
				path += arr[i] + "/";
			File f = new File(path);
			if(!f.exists())
				f.mkdirs();
			BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(filePath));
			byte[] bytesIn = new byte[4096];
			int read = 0;
			while ((read = zipIn.read(bytesIn)) != -1) {
				bos.write(bytesIn, 0, read);
			}
			bos.close();
		}catch(Exception e) {e.printStackTrace();}
	}

	public void unzipFiles(String zipFilePath){
		try {
			String destDirectory = zipFilePath + "code";
			File destDir = new File(destDirectory);
			if (destDir.exists())
				Files.walk(Paths.get(destDirectory)).filter(Files::isRegularFile).map(Path::toFile).forEach(File::delete);
			destDir.mkdir();
			ZipInputStream zipIn = new ZipInputStream(new FileInputStream(zipFilePath));
			ZipEntry entry = zipIn.getNextEntry();
			while (entry != null) {
				String filePath = destDirectory + File.separator + entry.getName();
				if (!entry.isDirectory()) {
					extractFile(zipIn, filePath);
				} else {
					File dir = new File(filePath);
					dir.mkdir();
				}
				zipIn.closeEntry();
				entry = zipIn.getNextEntry();
			}
			zipIn.close();
		}catch(Exception e) {e.printStackTrace();}
	}

	public static void fetchFiles(File dir, Consumer<File> fileConsumer) {
		if (dir.isDirectory())
			for (File file1 : dir.listFiles())
				fetchFiles(file1, fileConsumer);
		else
			fileConsumer.accept(dir);
	}

	public Map<String, List<String>> getFiles(String repoCodePath) {
		Map<String, List<String>> repoCode = new TreeMap<String, List<String>>();
		File file = new File(repoCodePath);
		fetchFiles(file, f -> {
			List<String> data = new ArrayList<String>();
			data.add(String.valueOf(f.length()));
			DataInputStream dis = null;
			byte[] datainBytes = null;
			try {
				dis = new DataInputStream(new FileInputStream(f));
				datainBytes = new byte[dis.available()];
				dis.readFully(datainBytes);
				dis.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			String content = new String(datainBytes, 0, datainBytes.length);
			data.add(content);
			repoCode.put(f.getAbsolutePath().split("/uploads/")[1], data);
		}); 
		return repoCode.entrySet().stream()
				.sorted((Entry<String, List<String>> e1,
						Entry<String, List<String>> e2) -> StringUtils.countOccurrencesOf(e1.getKey(), "/")
								- StringUtils.countOccurrencesOf(e2.getKey(), "/"))
				.collect(toMap(e -> e.getKey(), e -> e.getValue(), (e1, e2) -> e2, LinkedHashMap::new));
	}

	public Object getAllUsersExcept(Long userId) {
		return userRepo.findAllByUserAutoGenIdIsNot(userId);
	}

	public void saveCode(Long repoId, Integer version, String filename, String code) {
		try (PrintWriter fileout = new PrintWriter("uploads/" + filename)) {
			fileout.println(code);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}

	public void addRepoToUserName(CodeLabRepo repo, String username, Long ownerId) {
		CodeLabUser user = userRepo.findByUsernameAndUserAutoGenIdIsNot(username, ownerId);
		if (user != null) {
			user.getRepos().add(repo);
			userRepo.save(user);
		}
	}

	public List<MergeRequest> getMergeRequests(Long userId) {
		return mergeRepo.findAllByReqTo(userRepo.findById(userId).get().getUsername());
	}
	@Transactional
	public boolean MRAction(Long repoId, Integer version, Integer flag) {
		CodeLabRepoVersion repoVersion = null;
		if(flag == 1) {
			repoVersion = versionRepo.findByRepo_RepoAutoGenIdAndIsMaster(repoId, true);
			if(repoVersion != null) {
				repoVersion.setIsMaster(false);
				versionRepo.save(repoVersion);
			}
			repoVersion = versionRepo.findByRepo_RepoAutoGenIdAndVersion(repoId, version);
			repoVersion.setIsMaster(true);
		}
		else
			repoVersion = versionRepo.findByRepo_RepoAutoGenIdAndVersion(repoId, version);
		repoVersion.setIsMrPending(false);
		versionRepo.save(repoVersion);
		mergeRepo.deleteByRepoIdAndVersion(repoId, version);
		return true;
	}

}
