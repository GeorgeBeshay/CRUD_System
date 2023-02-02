package filter;

import java.util.*;
import components.*;

public interface Criteria {
	
	public ArrayList<Product> meetCriteria(List<Product> products, String str);

}
