package components;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Products")
public class Product {
	
	private String name;
	
	public Product(String name) {
		this.name = name;
	}
	
	

}
