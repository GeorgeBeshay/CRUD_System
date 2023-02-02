package filter;

public class CriteriaFactory {
	
	/*
	 * 1 >> search by name
	 * 2 >> search by category
	 * 3 >> search by seller
	 */
	public Criteria getCriteria(int condition) {
		if(condition == 1) 
			return new NameCriteria();
		else if(condition == 2) 
			return new CategoryCriteria();
		else if(condition == 3)
			return new SellerCriteria();
		else {
			System.out.println("Condition has no corresponding criteria");
			return null;
		}
		
	}

}
