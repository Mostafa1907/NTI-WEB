let orders=
[
    {
        id : "111" ,
        status:"cancelled",
        stockAvailable:false,
        amount:100
    },
    {
        id : "222" ,
        status:"invalid",
        stockAvailable:false,
        amount:150
    },
    {   id : "333" ,
        status:"valid",
        stockAvailable:false,
        amount:200
    }

]

let totalrev=0
let successfulOrders=0
let processedOrders=0
let skippedOrders=0
let stockFailure=0

for(let i=0 ; i< orders.length ; i++)
{
    let order = orders[i]

    if(order.status ==="cancelled"|| order.status==="invalid" || order.stockAvailable===false)
    {
        console.log( `Order ${order.id} skipped` )
        skippedOrders++
        console.log("skippedOrders : "+skippedOrders);
        
    if (order.stockAvailable === false) 
        {
            stockFailure++;
            console.log("stockFailure : " +stockFailure);
            
        }    
        if ( skippedOrders === 3 || stockFailure === 3 )
        {
            console.log("System stopped due to critical failure")
        break;
        }
        
    }
    else
    {
        totalrev += order.amount
        successfulOrders++
        processedOrders++
        console.log("successfulOrders :" + successfulOrders);
        console.log("processedOrders : "+ processedOrders);

        console.log(`Order ${order.id} Successed`)
    }
    
    alert
        ("\nTotalRevenue : "+ totalrev +
         "\nSuccessfulOrders : "+ successfulOrders +
         "\nprocessed orders count : " + processedOrders
        )





}
