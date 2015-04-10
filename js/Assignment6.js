function MenuChoice()
{
    if (document.getElementById("menu").value == "Add A Customer")
    {
        document.getElementById("addcustom").style.visibility = "visible";
        document.getElementById("shipchange").style.visibility = "hidden";
        document.getElementById("deletecustom").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Change Customer Shipping")
    {
        document.getElementById("addcustom").style.visibility = "hidden";
        document.getElementById("shipchange").style.visibility = "visible";
        document.getElementById("deletecustom").style.visibility = "hidden";
    }
    
    else if (document.getElementById("menu").value == "Delete A Customer")
    {
        document.getElementById("addcustom").style.visibility = "hidden";
        document.getElementById("shipchange").style.visibility = "hidden";
        document.getElementById("deletecustom").style.visibility = "visible";
    }
    else
    {
        document.getElementById("addcustom").style.visibility = "hidden";
        document.getElementById("shipchange").style.visibility = "hidden";
        document.getElementById("deletecustom").style.visibility = "hidden";
    }
}
function AddCustomer()
{
    var ajx = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    var custid = document.getElementById("customid").value;
    var custname = document.getElementById("customname").value;
    var custcity = document.getElementById("customcity").value;
    var objdisplay = document.getElementById("result");
    
    var newcustomer = '{"CustomerID":"' + custid + '","CompanyName":"' + custname + '","City":"' + custcity + '"}';
    
    ajx.onreadystatechange = function()
    {
        if (ajx.readyState == 4 && ajx.status == 200)
            {
                var result = JSON.parse(ajx.responseText);
                var outcome = result.WasSuccessful
                var error = result.Exception;
                OperationResult(outcome, error, objdisplay);
            }
    }
    
    ajx.open("POST", url, true);
    ajx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajx.send(newcustomer);
}

function UpdateAddress()
    {
        var xmlhttp = new XMLHttpRequest();
        var changeinfo = document.getElementById("shipmentchange");
        xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                {
                    var output = JSON.parse(xmlhttp.responseText);
                    OperationResult(output, "", changeinfo);
                }
        }    
        var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
        var ordrid = Number(document.getElementById("ordid").value);
        var sn = document.getElementById("sname").value;
        var sa = document.getElementById("sadd").value;
        var sc = document.getElementById("scity").value;
        var sp = document.getElementById("spcode").value;
        
        var parameters = '{"OrderID":' + ordrid + ',"ShipmentName":"' + sn + '","ShipmentAddress":"' + sa + '","ShipmentCity":"' + sc + '","ShipmentPostCode":"' + sp + '"}';
                
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(parameters);
    }
    
function DeleteCustomer()
       {
            var xmlhttp = new XMLHttpRequest();
            var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
            url += document.getElementById("custdelid").value;
            var objdisplay = document.getElementById("dresult");
                        
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var output = JSON.parse(xmlhttp.responseText);
                    var outcome = output.DeleteCustomerResult.WasSuccessful
                    var error = output.DeleteCustomerResult.Exception;
                    OperationResult(outcome, error, objdisplay);
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }

function OperationResult(success, exception, displayObject)
{
    switch (success)
     {
        case 1:
            displayObject.innerHTML = "The operation was successful!";
            break;
        case 0:
            displayObject.innerHTML = "The operation was not successful:<br>" + exception;
            break;
        case -2:
            displayObject.innerHTML = "The operation was not successfuL!.";
            break;
        case -3:
            displayObject.innerHTML = "The operation was not successful due to INVALID ID";
            break;
        default:
            alert("The operation code can't be completed.");
    }
}