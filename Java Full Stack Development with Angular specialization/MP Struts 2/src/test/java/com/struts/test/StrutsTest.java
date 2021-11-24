package com.struts.test;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.apache.struts2.StrutsJUnit4TestCase;
import org.apache.struts2.StrutsTestCase;
import org.junit.Assert;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.opensymphony.xwork2.ActionProxy;
import com.struts.action.BooksAction;
import com.struts.pojo.Book;
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class StrutsTest  extends StrutsJUnit4TestCase{

	@Test
	public void testCase1() throws Exception {
		ActionProxy proxy = getActionProxy("/dbInitialize");
		String result = proxy.execute();
		Assert.assertEquals("success",result);
		request.setParameter("userName", "admin");
		request.setParameter("password", "admin");
		ActionProxy proxy1 = getActionProxy("/login");
		String result1 = proxy1.execute();
		Assert.assertEquals("success", result1);
		request.setParameter("userName", "admin1");
		request.setParameter("password", "admin");
		ActionProxy proxy2 = getActionProxy("/login");
		String result2 = proxy2.execute();
		Assert.assertEquals("input", result2);
		String parameter = request.getParameter("userName");
		Assert.assertEquals(parameter, "admin1");	
	}
	@Test
	public void testcase2() throws Exception{	
		request.setParameter("userName", "admin");
		request.setParameter("password", "admin");
		ActionProxy proxy1 = getActionProxy("/login");
		String result1 = proxy1.execute();
		Assert.assertEquals("success", result1);
	   ActionProxy proxy2 = getActionProxy("/booksAction");
       BooksAction accountAction = (BooksAction) proxy2.getAction();
       String result2 = proxy2.execute();
       Assert.assertEquals("success",result2 );
      List<Book> books =  accountAction.getBooks();
      Assert.assertEquals("book1", books.get(0).getBookId());    
	}
	@Test
	public void testcase3() throws Exception{
		request.setParameter("bookId", "book2");
		request.setParameter("bookName", "SpringServices");
		request.setParameter("bookAuthor", "Jhon2");
		request.setParameter("bookPrice", "5000");
		ActionProxy proxy = getActionProxy("/addAction");
	    String result =	proxy.execute();
		Assert.assertEquals("success", result);
		   ActionProxy proxy2 = getActionProxy("/booksAction");
		 BooksAction accountAction = (BooksAction) proxy2.getAction();
	       String result2 = proxy2.execute();
	       Assert.assertEquals("success",result2 );
	      List<Book> books =  accountAction.getBooks();
	      Assert.assertEquals("book2", books.get(1).getBookId());   
	      Assert.assertEquals("SpringServices", books.get(1).getBookName());   
	      Assert.assertEquals("Jhon2", books.get(1).getBookAuthor());   
	      Assert.assertEquals(5000, books.get(1).getBookPrice());   

		
	}
	@Test
	public void testcase4() throws Exception{
		request.addParameter("bookId", "book2");
		ActionProxy proxy = getActionProxy("/deleteAction");
		proxy.execute();
		  ActionProxy proxy2 = getActionProxy("/booksAction");
			 BooksAction accountAction = (BooksAction) proxy2.getAction();
		       String result2 = proxy2.execute();
		       Assert.assertEquals("success",result2 );
		      List<Book> books =  accountAction.getBooks();
		      Assert.assertEquals(1, books.size());   
	}
	@Test
	public void testcase5() throws Exception{
		request.setParameter("bookId", "book3");
		request.setParameter("bookName", "Microservices");
		request.setParameter("bookAuthor", "Jhon3");
		request.setParameter("bookPrice", "4000");
		ActionProxy proxy = getActionProxy("/addAction");
	    String result =	proxy.execute();
		Assert.assertEquals("success", result);
		   ActionProxy proxy2 = getActionProxy("/booksAction");
		 BooksAction accountAction = (BooksAction) proxy2.getAction();
	       String result2 = proxy2.execute();
	       Assert.assertEquals("success",result2 );
	      List<Book> books =  accountAction.getBooks();
	      Assert.assertEquals("book3", books.get(1).getBookId());   
	      Assert.assertEquals("Microservices", books.get(1).getBookName());   
	      Assert.assertEquals("Jhon3", books.get(1).getBookAuthor());   
	      Assert.assertEquals(4000, books.get(1).getBookPrice()); 
	}
	@Test
  public void testcase6() throws Exception{
			request.setParameter("bookId", "book4");
			request.setParameter("bookName", "Microservices with spring");
			request.setParameter("bookAuthor", "Jhon4");
			request.setParameter("bookPrice", "5000");
			ActionProxy proxy = getActionProxy("/addAction");
		    String result =	proxy.execute();
			Assert.assertEquals("success", result);
			   ActionProxy proxy2 = getActionProxy("/booksAction");
			 BooksAction accountAction = (BooksAction) proxy2.getAction();
		       String result2 = proxy2.execute();
		       Assert.assertEquals("success",result2 );
		      List<Book> books =  accountAction.getBooks();
		      Assert.assertEquals("book4", books.get(2).getBookId());   
		      Assert.assertEquals("Microservices with spring", books.get(2).getBookName());   
		      Assert.assertEquals("Jhon4", books.get(2).getBookAuthor());   
		      Assert.assertEquals(5000, books.get(2).getBookPrice()); 		
  }	
	@Test
	public void testcase7() throws Exception{
		request.setParameter("bookId", "book4");
		request.setParameter("bookName", "Microservices with spring");
		request.setParameter("bookAuthor", "Jhon4");
		request.setParameter("bookPrice", "5000");
		ActionProxy proxy = getActionProxy("/updateDataAction");
	    String result =	proxy.execute();
		Assert.assertEquals("success", result);
		 Assert.assertEquals("book4", request.getParameter("bookId"));   
	      Assert.assertEquals("Microservices with spring", request.getParameter("bookName"));   
	      Assert.assertEquals("Jhon4", request.getParameter("bookAuthor"));   
	      Assert.assertEquals("5000", request.getParameter("bookPrice")); 	
	    request.setParameter("bookPrice", "4500");
	    ActionProxy proxy3 = getActionProxy("/updateAction");
	    String result1 =	proxy3.execute();
		Assert.assertEquals("success", result1);
		 ActionProxy proxy2 = getActionProxy("/booksAction");
		 BooksAction accountAction = (BooksAction) proxy2.getAction();
	       String result2 = proxy2.execute();
	       Assert.assertEquals("success",result2 );
	      List<Book> books =  accountAction.getBooks();
	      Assert.assertEquals("book4", books.get(2).getBookId());   
	      Assert.assertEquals("Microservices with spring", books.get(2).getBookName());   
	      Assert.assertEquals("Jhon4", books.get(2).getBookAuthor());   
	      Assert.assertEquals(4500, books.get(2).getBookPrice()); 	 
	}
	
	
	
}
