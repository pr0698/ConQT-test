import axios from 'axios';
import { useEffect, useState } from 'react';


export function ItemSuppDetails(){
    const[tableData,setTableData] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);


    const fetchData =  async () => {
        try{
            const response =  await axios.get('https://apis-technical-test.conqt.com/s');
            if(response.data && response.data.status===200 && response.data.data){
                setTableData(response.data.data);
            }
        }catch(err){
            console.log('Error fetching the data', error);
        }
    }
     return(
        <div className='table-container'>
             <table>
                <thread>
                    <tr>
                        <th>Supplier</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>City , Country</th>
                        <th>Email,Phone Number</th>


                    </tr>

                    <tbody>
                        {tableData.map((item,index) => {
                            <tr key={index}>
                               <td>{item.supplier.supplierName}</td>
                               <td>{item.itemDetails.itemName}</td>
                               <td>{item.itemDetails.currency}{item.itemDetails.unitPrice}</td>
                               <td>{`${item.supplier.cityId},${item.supplier.countryId}`}</td>
                               <td>{`${item.supplier.email},${item.supplier.phoneCode},${item.supplier.phoneNumber}`}</td>

                            </tr>
                        })}
                    </tbody>
                </thread>
             </table>
        </div>
     )



} 