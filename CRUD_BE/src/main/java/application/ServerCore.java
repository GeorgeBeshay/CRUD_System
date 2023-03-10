package application;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;
import org.springframework.stereotype.Service;
import components.*;
import filter.*;

@Service
public class ServerCore {
	
	// ----------------------- Class Fields -----------------------
	private static ServerCore serverCore;
	@Autowired
	private ProductRepository productRepository;
	private boolean updateStatusFlag;
	// ----------------------- Singleton Design Pattern Implementation ----------------------- 
	private ServerCore() {
		this.updateStatusFlag = false;
	}
	public static ServerCore getInstance() {
		if(ServerCore.serverCore == null) 
			serverCore = new ServerCore();
		return ServerCore.serverCore;
	}
	// ------------------------ Separator ------------------------
	public boolean createProduct(Product product) {
		this.updateStatusFlag = true;
		if(validateProductId(product.get_id())) {
			productRepository.save(product);
			System.out.println("Product Created Successfully.");
			return true;
		} else {
			System.out.println("Product Creation Failed, Id is already taken.");
			return false;
		}
	}
	// ------------------------ Separator ------------------------
	public boolean deleteProduct(Product product) {
		this.updateStatusFlag = true;
		if(!validateProductId(product.get_id())) {
			productRepository.deleteById(product.get_id());
			System.out.println("Product Has Been Deleted Successfully.");
			return true;
		} else {
			System.out.println("Product Couldn't Be Found.");
			return false;
		}
	}
	// ------------------------ Separator ------------------------
	public boolean deleteProduct(String productId) {
		this.updateStatusFlag = true;
		if(!validateProductId(productId)) {
			productRepository.deleteById(productId);
			System.out.println("Product Has Been Deleted Successfully.");
			return true;
		} else {
			System.out.println("Product Couldn't Be Found.");
			return false;
		}
	}
	// ------------------------ Separator ------------------------
	public void updateProduct(Product product) {
		this.updateStatusFlag = true;
		productRepository.save(product);
		System.out.println("Product has been updated successfully");
	}
	// ------------------------ Separator ------------------------
	public List<Product> loadProducts(){
		List<Product> products = productRepository.findAll(); 
		System.out.println("Products have been loaded successfully.");
		this.updateStatusFlag = false;
		return products;
	}
	// ------------------------ Separator ------------------------
	public boolean checkForUpdates() {
		return this.updateStatusFlag;
	}
	// ------------------------ Separator ------------------------
	public ArrayList<Product> search(int condition, String str){
		CriteriaFactory criteriaFactory = new CriteriaFactory();
		Criteria requestedCriteria = criteriaFactory.getCriteria(condition);
		System.out.println("Matching products have been loaded successfully");
		return requestedCriteria.meetCriteria(productRepository.findAll(), str);
	}
	// ------------------------ Separator ------------------------
	public void emptyTheDB() {
		this.updateStatusFlag = true;
		productRepository.deleteAll();
		System.out.println("Database has been completely deleted");
	}
	// ----------------------- Secondary Methods -----------------------
	/**
	 * Method validates the id given, return a boolean flag indicating whether the product exists in the DB or not
	 * @param _id
	 * @return True >> Doesn't exist
	 * 					 False >> Exist
	 */
	public boolean validateProductId(String _id) {
		try {
			productRepository.findById(_id).get();
			return false;
		} catch(Exception E) {
			return true;
		}
	}
	// ------------------------ Separator ------------------------

}
