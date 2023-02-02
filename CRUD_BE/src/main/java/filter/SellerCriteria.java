package filter;

import java.util.*;

import components.Product;

public class SellerCriteria implements Criteria {

	@Override
	public ArrayList<Product> meetCriteria(List<Product> products, String str) {
		ArrayList<Product> good = new ArrayList<Product>();
		for(Product product : products) {
			if(product.getSeller().contains(str)) 
				good.add(product);
		}
		return good;
	}

}
