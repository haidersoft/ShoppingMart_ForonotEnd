import './OrderInvoice.css';
import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import { data } from 'jquery';


export class OrderInvoice extends Component {
    static displayName = OrderInvoice.name;
  
    constructor (props) {
     
      super(props);
      console.log(props);
      this.state = {
        data:JSON.parse(props.match.params.OrderData) 
      };
      if(this.props.match.url.indexOf("OrderInvoice") > -1){
          setTimeout(() => {
            window.print();
          }, 500);
       
      }
      
     
    }
  
   
    render () {
      return (
        <div className="container">
       
        <div className="row">
            <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title"><strong>Order summary</strong></h3>
                    </div>
                    <div className="panel-body">
                        <div className="table-responsive">
                            <table className="table table-condensed">
                                <thead>
                                    <tr>
                                        <td><strong>Item</strong></td>
                                        <td className="text-center"><strong>Price</strong></td>
                                        <td className="text-center"><strong>Quantity</strong></td>
                                        <td className="text-right"><strong>Totals</strong></td>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.data.map((item,index)=>
                                (
                                <tr key={index}>
                                    <td className="text-center">{index+1}</td>
                                    <td className="text-center">{item.Prices}</td>
                                    <td className="text-center">{item.Quantity}</td>
                                    <td className="text-center">{item.Prices * item.Quantity}</td>
                                </tr>
                                )
                               )}

                             </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
          );
    }
  }