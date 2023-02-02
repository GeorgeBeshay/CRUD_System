package filter;

import components.Product;
import java.util.*;

public class NameCriteria implements Criteria{

	@Override
	public ArrayList<Product> meetCriteria(List<Product> products, String str) {
		ArrayList<Product> good = new ArrayList<Product>();
		for(Product product : products) {
			if(product.getName().contains(str)) 
				good.add(product);
		}
		return good;
	}

}
