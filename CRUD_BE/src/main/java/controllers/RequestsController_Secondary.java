package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import application.*;
import components.*;
import java.util.*;

// use "http://localhost:8081/server/"
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/server/")
@RestController
public class RequestsController_Secondary {
	
	@Autowired
	private ServerCore serverCore = ServerCore.getInstance();
	
	/**
	 * Method implements the request used to check for updates, 
	 * system status flag will be true in case of any recent changes in the DB.
	 * this method should be called every X mS, in order to unify all the data 
	 * shown to the clients.
	 */
	@PostMapping(value = {"checkForUpdates"})
	public boolean checkForUpdates() {
		System.out.println("------------------------- Request -------------------------");
		System.out.println("Client Requested Checkup");
		return serverCore.checkForUpdates();
	}
	
	/**
	 * Administrative Function
	 * Empty the Database
	 */
	@PostMapping(value = {"empty"})
	public void empty() {
		System.out.println("------------------------- Request -------------------------");
		System.out.println("Admin Requested Database Deletion");
		serverCore.emptyTheDB();
	}
	
	/**
	 * Function implements the search operation requested by the client side, 
	 * using the factory design pattern and the filter design pattern.
	 * function takes an integer indicating the condition to filter by, and the string 
	 * literal the user is searching for.
	 * @param condition
	 * @param str
	 */
	@PostMapping(value = {"search/{condition}/{str}"})
	public ArrayList<Product> search(@PathVariable int condition, @PathVariable String str) {
		System.out.println("------------------------- Request -------------------------");
		System.out.println("Client Requested Search Operation");
		return serverCore.search(condition, str);
	}

}
