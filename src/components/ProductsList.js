
import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import { DatatablePage } from './DatatablePage'


export class ProductsList extends Component {
    static displayName = ProductsList.name;

    constructor(props) {
        super(props);
        this.state = {
            ProductData: [],
            loading: true,
            Columns: []
        };
    }
    
    
    fetchdata() {
        fetch("/GetProducts/0", {
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
        console.log(result);
        var arr = [];
        result.forEach(element => {
            arr.push(
               {
                productId: element.products.productId,
                productBarcode:element.products.productBarcode,
                productName:element.products.productName,
                expairyDate:element.products.expairyDate,
                salePrice:element.products.salePrice,
                quiantity: element.stocks != null ?  element.stocks.quiantity : ""
            });
       });
     
    this.setState({ 
        ProductData:arr,
        Columns: [
            {
                key: "productBarcode",
                text: "Barcode",
                className: "productBarcode",
                align: "left",
                sortable: true,
            },
            {
                key: "productName",
                text: "Name",
                className: "productName",
                align: "left",
                sortable: true
            },
            {
                key: "expairyDate",
                text: "Expairy Date",
                className: "expairyDate",
                sortable: true
            }, 
            {
                key: "salePrice",
                text: "Purchased Price",
                className: "salePrice",
                align: "left",
                sortable: true
            },
            {
                key: "quiantity",
                text: "Quantity",
                className: "quiantity",
                align: "left",
                sortable: true
            },
            {
                key: "productId",
                text: "Actions",
                className: "productId",
                sortable: true,
                align: "left",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <React.Fragment>
                            <button className="btn btn-primary btn-sm" onClick={() => this.props.history.push(`ProductDetails/${record.productId}`)}> Edit
                            </button>
                        </React.Fragment >
                    );
                }
            }
        ]
    });
    }

    componentDidMount() {
         this.fetchdata();
    }
    editRecord(record) {
        console.log("Edit Record", record);
    }

    
   
    render() {
        const { error, isLoaded, ProductData } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            return (
                <div>
                    <Row style={{paddingBottom: "10px",  paddingRight: "10px"}}>
                        <Col md={4}></Col>
                        <Col md={4}></Col>
                        <Col md={4} style={{textAlign:"right", paddingRight:"10px" }}>
                        <button className="btn btn-primary" onClick={() => this.props.history.push(`ProductDetails/0`)}>Add Product</button>
                        </Col>
                    </Row>
                    <DatatablePage data={this.state.ProductData} columns={this.state.Columns} > </DatatablePage >
                    
                </div>
            );
        }
        // async populateWeatherData() {
        //   const token = await authService.getAccessToken();
        //   const response = await fetch('weatherforecast', {
        //     headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        //   });
        //   const data = await response.json();
        //   this.setState({ ProductData: data, loading: false });
        // }
    }
}
