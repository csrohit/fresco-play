import org.apache.ibatis.jdbc.ScriptRunner;
import util.DbUtil;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.Reader;

public class RunningScripts {
    public void runDbScript() throws Exception {

        ScriptRunner sr = new ScriptRunner(DbUtil.getConnection());
        //Creating a reader object
        Reader reader = new BufferedReader(new FileReader("./db.sql"));
        //Running the script
        sr.runScript(reader);
    }
}
