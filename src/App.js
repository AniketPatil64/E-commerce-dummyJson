import { useState } from "react";
import "./App.css";
import { Data } from "./components/data";
function App() {
  const data = Data.products;
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
      <div className="App">
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
            <h5>Description:</h5>
            {popupData.description}
          </div>
          </div>
          
        </div>
      )}
      <div className="main-container">
        {getCurrentItems().map((item, index) => {
          return (
            <div key={index} className="item-container">
              <div>Product name : {item.title}</div>
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
                  <button onClick={()=>{
                    if(currentPage>1){
                      setcurrentPage(currentPage-1)
                    }
                  }}>Prev Page</button>
                  <span>{currentPage} out of {totalPages}</span>
                  <button onClick={()=>{
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



