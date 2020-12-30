export function SortArray(key, sortOrder, docSize = 0) {    
    if (docSize === 0) {
	    if (sortOrder === 'asc') {
		    return function(a, b) {    
		        if (a[key] > b[key]) {    
		            return 1;    
		        } else if (a[key] < b[key]) {    
		            return -1;    
		        }    
		        return 0;    
		    }    
		}
		else if (sortOrder === 'desc') {
			return function(a, b) {    
		        if (a[key] > b[key]) {    
		            return -1;    
		        } else if (a[key] < b[key]) {    
		            return 1;    
		        }    
		        return 0;    
		    }
		} 
	} else {
		if (sortOrder === 'asc') {
		    return function(a, b) {    
		        if (a[key][docSize] > b[key][docSize]) {    
		            return 1;    
		        } else if (a[key][docSize] < b[key][docSize]) {    
		            return -1;    
		        }    
		        return 0;    
		    }    
		}
		else if (sortOrder === 'desc') {
			return function(a, b) {    
		        if (a[key][docSize] > b[key][docSize]) {    
		            return -1;    
		        } else if (a[key][docSize] < b[key][docSize]) {    
		            return 1;    
		        }    
		        return 0;    
		    }
		} 
	}
} 