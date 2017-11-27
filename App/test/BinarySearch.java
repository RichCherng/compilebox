
public class BinarySearch {

	static int[] list = {1,2,3,5,6,15,19,21,23,25,28};

	public static void main(String[] args){

		System.out.println("15 is " + BinarySearch(list, 15));
		System.out.println("20 is " + BinarySearch(list, 20));
		System.out.println("23 is " + BinarySearch(list, 23));

		System.out.println("15 is " + BinarySearchRecursion(list, 15));
		System.out.println("20 is " + BinarySearchRecursion(list, 20));
		System.out.println("23 is " + BinarySearchRecursion(list, 23));
	}

	public static int BinarySearch(int[] list, int search){

		int start = 0;
		int end = list.length - 1;

		while(start <= end){
			int mid = (start + end) / 2;
			if(list[mid] == search){
				return mid;
			}

			if(search < list[mid]){
				// Search left side of the current mid index
				end = mid - 1;
			} else {
				// Search right size of the current mid index
				start = mid + 1;
			}
		}

		return -1;
	}

	public static int BinarySearchRecursion(int[] list, int search){

		return BSR(list, 0, list.length-1, search);
	}

	public static int BSR(int[] list, int start, int end,int search){

		int mid = (start + end)/2;
		if(list[mid] == search){
			return mid;
		} else if(start > end){
			return -1;
		}

		if( search < list[mid] ){
			// Search left
			return BSR(list, start, (mid - 1), search);
		} else{
			// Search Right
			return BSR(list, (mid + 1), end, search);
		}

	}
}
