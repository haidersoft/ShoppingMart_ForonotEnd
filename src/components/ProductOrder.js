import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import { OrderInvoice } from './OrderInvoice'

export class ProductOrder extends Component {
  static displayName = ProductOrder.name;
  constructor(props) {
    super(props);
    this.state = {
      ProductOrders : [],
      ProductBarcode : "",
     };
   
    this.handleChange = this.handleChange.bind(this);
    this.getPrdoctDetail = this.getPrdoctDetail.bind(this);
    this.addProductOrder = this.addProductOrder.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
  }

  handleChange(event) {
    
    this.setState({
    [event.target.name]: event.target.value
    }); 

  }

  getPrdoctDetail(event){
    if( event.key == "Enter"){
      if(this.state.ProductBarcode != "" && this.state.ProductBarcode != undefined){
        this.fetchdata();
      }
    }
    
  }

  addProductOrder(){
    let arr = JSON.parse(JSON.stringify(this.state.ProductOrders));
    arr.push({
      productId : 12,
      ProductName : "Water Botel",
      Prices : 120,
      Quantity : 0
    });
    this.setState({
      ProductOrders : arr,
      ProductBarcode: ""
    });
    
    
    
  }
  
  removeProductOrder(index){
    let arr = JSON.parse(JSON.stringify(this.state.ProductOrders));
    arr.splice(index,1);

    this.setState({
      ProductOrders:arr
    });
  }

  submitOrder(){
    if(this.state.ProductOrders.length > 0){
      let orderObj =  JSON.stringify(this.state.ProductOrders);
      this.props.history.push(`OrderInvoice/${orderObj}`);
    }
    else
      alert("Please add atleast one order.");
   
  }

  fetchdata() {
    fetch(`/GetProductByBarcode/${this.state.ProductBarcode}`, {
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

dataBind = (result)=>{
    let productResult = result[0].products

    let arr = JSON.parse(JSON.stringify(this.state.ProductOrders));
    arr.push({
      productId : productResult.productId,
      ProductName : productResult.productName,
      Prices : productResult.salePrice,
      Quantity : 0
    });
    this.setState({
      ProductOrders : arr,
      ProductBarcode: ""
    });
}

componentDidMount() {
     this.fetchdata();
}

  updateText = (e, index) => {
    const ProductOrders = [...this.state.ProductOrders];
    ProductOrders[index].Quantity = e.target.value

    this.setState({ ProductOrders });
  }

  render () {
    return (
      <div>
        <Row>
          <Col md={4}>
            <h3> Order Details </h3>
          </Col>
        </Row>
        <Row>
          <Col md={4} className = "form-group">
            <label >Barcodes</label>
            <input  className="form-control" name= "ProductBarcode" value={this.state.ProductBarcode == 0 ? '' : this.state.ProductBarcode}   placeholder="Barcode" onChange={this.handleChange} onKeyPress={this.getPrdoctDetail}></input>
          </Col>
        </Row>
          
        <Row>
        <Col md= {12}>
        <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Items</th>
            <th scope="col">Product Name</th>
            <th scope="col">Prices</th>
            <th scope="col">Quantity</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>   
        <tbody>
        {this.state.ProductOrders.map((item,index)=>
            (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.ProductName}</td>
                <td>{item.Prices}</td>
                <td>
                  <input  className="form-control" name= "ProductBarcode" value={item.Quantity == 0 ? '' : item.Quantity}   placeholder="Quantity" onChange={(e) => this.updateText(e, index)}></input>
                </td>
                <td>
                  <button className = "btn btn-danger" onClick={ () =>{this.removeProductOrder(index)} }>Remove</button>
                </td>
            </tr>
            )
                    
        )}
        </tbody>
      </table>
        </Col>
      </Row>

        <Row style={{paddingTop:"15px"}}>
          <Col md={4}>
          <button className="btn btn-primary" onClick={this.submitOrder}>Submit Order</button>
          </Col>
        </Row>
</div>



    );
  }
}
