package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import application.*;
import components.*;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/server/")
@RestController
public class RequestsController {
	
	@Autowired
	private ServerCore serverCore = ServerCore.getInstance();
	
	@PostMapping(value = {"create/{name}"})
	public Product create(@PathVariable String name) {
		return serverCore.createProd(name);
	}
	
	@PostMapping(value = {"empty"})
	public void empty() {
		serverCore.emptyTheDB();
	}

}
