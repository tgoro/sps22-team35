package com.google.sps.servlets;

import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;

/** Handles requests sent to the /hello URL. Try running a server and navigating to /hello! */
@WebServlet("/hello")
public class HelloWorldServlet extends HttpServlet {

    private ArrayList<String> messages = new ArrayList<String>();  

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    messages.add(" My Favorite Game Of All Time Is Sonic Unleashed! ");
    messages.add(" My Favorite Movie Of All Time Is Ultraviolet! ");
    messages.add(" My Favorite Food Is Some Delicious Pizza! ");
    String messagesAsJSON = JsonViaGson(messages);

    response.setContentType("application/json;");
    response.getWriter().println(messagesAsJSON);
  }

  public String JsonViaGson(ArrayList<String> messages){
      Gson gson = new Gson();
      String toJSON = gson.toJson(messages);
      return toJSON;
  }
}
