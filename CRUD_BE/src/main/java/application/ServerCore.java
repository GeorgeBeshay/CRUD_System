package application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import components.*;

@Service
public class ServerCore {
	
	// ----------------------- Class Fields -----------------------
	private static ServerCore serverCore;
	@Autowired
	ProductRepository productRepository;
	// ----------------------- Singleton Design Pattern Implementation ----------------------- 
	private ServerCore() {}
	public static ServerCore getInstance() {
		if(ServerCore.serverCore == null) 
			serverCore = new ServerCore();
		return ServerCore.serverCore;
	}
	// ----------------------- Testing -----------------------
	public Product createProd(String name) {
		return productRepository.save(new Product(name));
	}
	public void emptyTheDB() {
		productRepository.deleteAll();
		System.out.println("MongoDB Documents have been deleted.");
	}
	// ----------------------- Class Methods -----------------------

}
