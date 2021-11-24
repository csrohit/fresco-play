package com.example.project;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.example.project.Model.ApplicationUser;
import com.example.project.Model.Appointment;
import com.example.project.Model.Patient;
import com.example.project.repository.PatientRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;

import org.junit.runners.MethodSorters;

@RunWith(SpringRunner.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@ContextConfiguration
@SpringBootTest
public class HealthCareServiceApplicationTests {
    public String token="";
    @Autowired
    private ObjectMapper mapper; 
    @Autowired
    private PatientRepository pr;
    
    private MockMvc mockMvc; 
    @Autowired
      WebApplicationContext context;
     @Before
      public void setup() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
      }


    @Test
    public void contextLoads() {
        
    }
    
    @Test
    public void test1() throws Exception{
        
        ApplicationUser u =  new ApplicationUser("user2","user2@hcs.com","user@2","9999999999","chennai");
        byte[] iJson = toJson(u);
        mockMvc.perform(post("/register")
                .content(iJson)
                 .contentType(MediaType.APPLICATION_JSON)
                 .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        
    }
    @Test
    public void test2() throws Exception{
        
        ApplicationUser u =  new ApplicationUser("user1","user1@hcs.com","user@1","9999999989","chennai");
        byte[] iJson = toJson(u);
        mockMvc.perform(post("/register")
                .content(iJson)
                 .contentType(MediaType.APPLICATION_JSON)
                 .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        
    }
    @Test
    public void test3() throws Exception{
        
        
        ApplicationUser u =  new ApplicationUser("user1","user@1");
        byte[] iJson = toJson(u);
    MvcResult result =    mockMvc.perform(post("/signin")
                .content(iJson)
                 .contentType(MediaType.APPLICATION_JSON)
                 .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn();
    token = JsonPath.read(result.getResponse().getContentAsString(), "$.token");
    System.out.println("hello1"+token);
    Patient p = new Patient("patient1","male","27/05/1996","patient1@hcs.com","8989898989");
    byte[] iJson1 = toJson(p);
    mockMvc.perform(get("/viewprofile/user1")
            .header(HttpHeaders.AUTHORIZATION,
                    "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.user_name").value("user1"));
    
    
        
    }
    @Test
    public void test4() throws Exception{
        ApplicationUser u =  new ApplicationUser("user1","user@1");
        byte[] iJson1 = toJson(u);
    MvcResult result =    mockMvc.perform(post("/signin")
                .content(iJson1)
                 .contentType(MediaType.APPLICATION_JSON)
                 .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn();
    token = JsonPath.read(result.getResponse().getContentAsString(), "$.token");
        
        Patient p = new Patient("patient1","male","27/05/1996","patient1@hcs.com","8989898989");
        byte[] iJson = toJson(p);
        mockMvc.perform(post("/patients/register")
                .header("Authorization","Bearer "+ token)
                    .content(iJson)
                     .contentType(MediaType.APPLICATION_JSON)
                     .accept(MediaType.APPLICATION_JSON))
                    
                    .andExpect(status().isOk());
        Patient p1 = new Patient("patient2","male","27/05/1996","patient2@hcs.com","8989998989");
        byte[] iJson2 = toJson(p1);
        mockMvc.perform(post("/patients/register")
                .header("Authorization","Bearer "+ token)
                    .content(iJson2)
                     .contentType(MediaType.APPLICATION_JSON)
                     .accept(MediaType.APPLICATION_JSON))
                    
                    .andExpect(status().isOk());
        MvcResult result1 =    mockMvc.perform(get("/patients/list")
                .header("Authorization","Bearer "+ token)
                 .contentType(MediaType.APPLICATION_JSON)
                 .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn();
        System.out.println("hello5"+result1);
        List<Patient> patient = pr.findAll();
        String patientid = patient.get(0).getPatient_Id();
        String patientid1 = patient.get(1).getPatient_Id();
        System.out.println("size"+patientid);
        mockMvc.perform(get("/patients/view/"+patientid)
                .header(HttpHeaders.AUTHORIZATION,
                        "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(MockMvcResultMatchers.jsonPath("$.patient_name").value("patient1"));
        mockMvc.perform(get("/patients/view/"+patientid1)
                .header(HttpHeaders.AUTHORIZATION,
                        "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(MockMvcResultMatchers.jsonPath("$.patient_name").value("patient2"));
        
        
    }
    @Test
    public void test5() throws Exception{
        ApplicationUser u =  new ApplicationUser("user1","user@1");
        byte[] iJson1 = toJson(u);
    MvcResult result =    mockMvc.perform(post("/signin")
                .content(iJson1)
                 .contentType(MediaType.APPLICATION_JSON)
                 .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn();
    token = JsonPath.read(result.getResponse().getContentAsString(), "$.token");
    List<Patient> patient = pr.findAll();
    String patientid = patient.get(0).getPatient_Id();
     SimpleDateFormat sd = new SimpleDateFormat("dd/MM/yyyy");
     Date date1 = sd.parse("27/05/1996");
    Appointment A1 = new Appointment("disease1",date1,"High",patientid);
    byte[] iJson2 = toJson(A1);
    mockMvc.perform(post("/appointment/register")
            .header(HttpHeaders.AUTHORIZATION,
                    "Bearer " + token)
            .content(iJson2)
             .contentType(MediaType.APPLICATION_JSON)
             .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());
    

    
    }
    private byte[] toJson(Object r) throws Exception {
        ObjectMapper map = new ObjectMapper();
        return map.writeValueAsString(r).getBytes();
        }

}
