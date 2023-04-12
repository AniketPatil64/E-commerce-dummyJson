import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
const [data,setdata]=useState([])
  useEffect(()=>{
    axios.get("https://dummyjson.com/products?limit=50").then((resp)=>{
    setdata(resp.data.products);
    }).catch(err=>{
      console.log("error Occures :", err);
    })
  },[data.length])
 
  const [popup, setpopup] = useState(false);
  const [popupData, setpopupData] = useState({});
  const [currentPage,setcurrentPage] = useState(1);
  const itemsperPage = 10;
  const totalPages = Math.ceil(data.length/itemsperPage);
  const getCurrentItems = ()=>{
    const filteredData = selectCategory !== "all"?
    data.filter(item=>item.category === selectCategory):
    data;
    const startIndex = (currentPage-1)*itemsperPage;
    const endIndex = startIndex +itemsperPage
    return filteredData.slice(startIndex,endIndex);
  }
  const [selectCategory,setselectCategory] =useState("all");

  const handleCarTypeChange = (event) => {
    setselectCategory(event.target.value)
  };
  const PopUpMessage = (data) => {;
    setpopupData(data)
    setpopup(true);
  };
  return (
    <div>
      <div className={`App ${popup} ? "POPUP" :""`}>
      <h1 className="available-header">Available products</h1>
      <select className="dropdown" onChange={handleCarTypeChange}>
      <option className="options" value="all">All</option>
        <option className="options" value="fragrances">fragrances</option>
        <option className="options" value="smartphones">smartphones</option>
        <option className="options" value="laptops">laptops</option>
        <option className="options" value="womens-dresses">womens-dresses</option>
      </select>
      {popup && (
        <div className="popup">
          <div className="pop-header">
          <div>
          <h3>{popupData.category}</h3>
          <h3>Product name:{popupData.title}</h3>
          </div>
            <button
            className="pop-close-btn"
              onClick={() => {
                setpopup(false);
              }}
            >
              Close
            </button>
          </div>
          <div className="pop-container">
            <div>
            <img className="popup-img" src={popupData.images[0]} alt="hello"/>
            </div>
            <div className="pop-description">
            <h3>Description:</h3>
           <h4> {popupData.description}</h4>
          </div>
          </div>
          
        </div>
      )}
      <div className="main-container">
        {getCurrentItems().map((item, index) => {
          return (
            <div key={index} className="item-container">
              <div>Product : {item.title}</div>
              <div className="product-img">
                <img
                  className="img-attr"
                  src={item.images[0]}
                  alt="img"
                  onClick={() => {
                    PopUpMessage(item);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {
        getCurrentItems().length > 5 && 
        <div className="counter-btns">
                  <button
                   className="pop-close-btn"
                   onClick={()=>{
                    if(currentPage>1){
                      setcurrentPage(currentPage-1)
                    }
                  }}>Prev Page</button>
                  <span>{currentPage} out of {totalPages}</span>
                  <button
                  className="pop-close-btn"
                   onClick={()=>{
                    if(currentPage<totalPages){
                      setcurrentPage(currentPage+1)
                    }
                  }}>Next Page</button>
              </div>
      }
    </div>
    
    </div>
  );
}

export default App;



