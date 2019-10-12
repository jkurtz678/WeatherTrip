import axios from "axios";

//const KEY = 'X29HwNj6VBmCD2KXJXXlVMi5QUxQA10g';
//const KEY = "X29HwNj6VBmCD2KXJXXlVMi5QUxQA10g";


export default axios.create({
	baseURL: "https://api.tomtom.com"
});
