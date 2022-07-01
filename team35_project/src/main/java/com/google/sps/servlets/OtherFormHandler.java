package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//
@WebServlet("/other-form-handler")
public class OtherFormHandler extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    //Get value for Joke teller input
    String jokeValue = request.getParameter("joke");

     // Print the jokeValue so you can see it in the server logs.
     System.out.println("Joke submitted: " + jokeValue);

     // Write the value to the response so the user can see it.
    response.getWriter().println("You submitted the joke: " + jokeValue);

    if(request.getParameter("joke").equals(" ")){
        response.sendRedirect("https://jfeliciano-sps-summer22.uc.r.appspot.com");
    } else{
        response.sendRedirect("https://jfeliciano-sps-summer22.uc.r.appspot.com");
    }
  }
}