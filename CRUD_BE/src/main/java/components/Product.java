package components;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Products")
public class Product {
	
	private String _id;
	private String name;
	private int amount;
	private String seller;
	private String category;
	private int discountPercent;			// %
	private double price;
	
	public Product(String _id, String name, int amount, String seller, String category, int discountPercent,
			double price) {
		super();
		this._id = _id;
		this.name = name;
		this.amount = amount;
		this.seller = seller;
		this.category = category;
		this.discountPercent = discountPercent;
		this.price = price;
	}
	
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public String getSeller() {
		return seller;
	}
	public void setSeller(String seller) {
		this.seller = seller;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public int getDiscountPercent() {
		return discountPercent;
	}
	public void setDiscountPercent(int discountPercent) {
		this.discountPercent = discountPercent;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	
	
	
	

}
