import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap';

export class ProductDetails extends Component {
  static displayName = ProductDetails.name;

  constructor(props) {
    super(props);
    this.state = {
       currentCount: 0,
       ProductBarcode : "",
       ProductName: "",
       ExpairyDate: "",
       PurchasedPrice: 0,
       SalePrice:0,
       Quantity:0
     };
    this.incrementCounter = this.incrementCounter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  addProduct = ()=> {
    
    let ProductStock = {
      Products : {
        ProductId : parseInt(this.props.match.params.productId),
        ProductBarcode : this.state.ProductBarcode,
        ProductName  : this.state.ProductName,
        ExpairyDate   : this.state.ExpairyDate,
        PurchasedPrice : this.state.PurchasedPrice,
        SalePrice     : this.state.SalePrice,
        
      },
      Stocks : {
        Quiantity : this.state.Quantity
      }
    }
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      header:("Access-Control-Allow-Origin: *"),
      body: JSON.stringify(ProductStock)
  };

  
  
    fetch(
      "/AddProduct", requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                });
                this.props.history.push(`/`);
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
    )
  }
  componentDidMount() {
    if(this.props.match.params.productId != 0){
      this.fetchdata();
    }
  }

  fetchdata() {
    fetch(`/GetProducts/${this.props.match.params.productId}`, {
        header:("Access-Control-Allow-Origin: *")
    })
        .then(res => res.json())
        .then(
            (result) => {
                this.dataBind(result);
                this.setState({
                    isLoaded: true,
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
    )
}
  resetState(){
    this.setState({
      currentCount: 0,
       ProductBarcode : "",
       ProductName: "",
       ExpairyDate: "",
       PurchasedPrice: 0,
       SalePrice:0,
       Quantity:0
    });
  }
  dataBind(result){
    if(result != null){
      this.setState({
      ProductBarcode :result[0].products.productBarcode,
      ProductName: result[0].products.productName,
      ExpairyDate:  result[0].products.expairyDate,
      PurchasedPrice:  result[0].products.purchasedPrice,
      SalePrice: result[0].products.salePrice,
      Quantity: result[0].stocks != null ?  result[0].stocks.quiantity : 0
    })
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  

  render() {
    return (
        <div>

              <Row>
                {
                   this.props.match.params.productId == 0 ?
                   <Col md={4}>
                   <label >Product Barcode</label>
                   <input  className="form-control"  name= "ProductBarcode"  value={this.state.ProductBarcode}  placeholder="Product Barcode" onChange={this.handleChange}></input>
                   </Col>
                   :
                   <Col md={4} style={{paddingTop:"15px", fontWeight:"bold"}}>
                  <label >Product Barcode</label>
                   <span title="Barcode" style={{paddingLeft: "10px"}}>{this.state.ProductBarcode}</span>
                   </Col>
                }
               
                <Col md={4}>
                <label >Product Name</label>
                <input type="text" className="form-control" name= "ProductName"  value={this.state.ProductName}  placeholder="Product Name" onChange={this.handleChange}></input>
                </Col>
               
              </Row>
              <Row>
                <Col md={4}>
                  <label >Purchased Price</label>
                  <input  className="form-control" name= "PurchasedPrice" value={this.state.PurchasedPrice == 0 ? '' : this.state.PurchasedPrice}   placeholder="Purchased Price" onChange={this.handleChange}></input>
                </Col>
                <Col md={4}>
                  <label >Sale Price</label>
                  <input type="text" className="form-control" name= "SalePrice"  value={this.state.SalePrice == 0 ? '' : this.state.SalePrice}  placeholder="Sale Price" onChange={this.handleChange}></input>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <label >Expairy Date</label>
                  <input type="text" className="form-control" name= "ExpairyDate"  value={this.state.ExpairyDate}   placeholder="Expairy Date" onChange={this.handleChange}></input>
                </Col>
                 {
                   this.props.match.params.productId != 0 ? 
                   <Col md={4}>
                   <label >Quantity </label>
                   <span> {this.state.Quantity} </span> <span>  + </span> <input type="text" className="form-control" name= "Quantity"  value={this.state.Quantity == 0 ? "" : this.state.Quantity}   placeholder="Quiantity" onChange={this.handleChange}></input>
                 </Col>
                 :
                 <Col md={4}>
                 <label >Quantity</label>
                 <input type="text" className="form-control" name= "Quantity"  value={this.state.Quantity == 0 ? "" : this.state.Quantity}   placeholder="Quiantity" onChange={this.handleChange}></input>
               </Col>
                 }
                
                 
               
              </Row>
          
        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.addProduct}> {this.props.match.params.productId == 0 ? `Add` : `Update`} Product</button>
      </div>
    );
  }
}
