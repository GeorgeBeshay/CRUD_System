package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import application.ServerCore;
import components.Product;

//use "http://localhost:8081/server/"
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/server/")
@RestController
public class RequestController_Primary {
	
	@Autowired
	private ServerCore serverCore = ServerCore.getInstance();
	
	/**
	 * Function implements the products reading process in "CRUD", fetching all the 
	 * saved products from the database and returning them.
	 * @return
	 */
	@PostMapping(value = {"load"})
	public List<Product> loadProducts() {
		System.out.println("------------------------- Request -------------------------");
		System.out.println("Client Requested To Load Products");
		return serverCore.loadProducts();
	}
	
	/**
	 * Function implements the product creation request, taking the product to be stored
	 * as a parameter.
	 * @param product
	 * @return boolean flag indicating the creation status
	 */
	@PostMapping(value = {"create"})
	public boolean createProduct(@RequestBody Product product) {
		System.out.println("------------------------- Request -------------------------");
		System.out.println("Client Requested Product Creation");
		return serverCore.createProduct(product);
	}
	
	/**
	 * Function implements the product update request, taking the product after being updated
	 * as a parameter.
	 * @param product
	 * @return boolean flag indicating the process status
	 */
	@PostMapping(value = {"update"})
	public void updateProduct(@RequestBody Product product) {
		System.out.println("------------------------- Request -------------------------");
		System.out.println("Client Requested Product Update");
		serverCore.updateProduct(product);
	}
	
	/**
	 * Function implements the product deletion request, taking the product to be deleted
	 * as a parameter
	 * @param product
	 */
	@PostMapping(value = {"delete"})
	public boolean deleteProduct(@RequestBody Product product) {
		System.out.println("------------------------- Request -------------------------");
		System.out.println("Client Requested Product Deletion");
		return serverCore.deleteProduct(product);
	}
	
	/**
	 * Function implements the product deletion - via the product id - taking the product id 
	 * to be deleted as a parameter 
	 * @param productId
	 * @return
	 */
	@PostMapping(value = {"deleteById"})
	public boolean deleteProduct(@RequestBody String productId) {
		System.out.println("------------------------- Request -------------------------");
		System.out.println("Client Requested Product Deletion - using the product Id -");
		return serverCore.deleteProduct(productId);
	}

}
