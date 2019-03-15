// assuming you loaded your data into a json object named json and that it contains a field called "data" that contains a list of the records you want to inject into the new array.
var json = require('InfobloxServer.json');
var keeperFields = ["IP Subnet", "Config Services", "Subnet Mask", "VLAN Number"];
var newJSON = {
};

// put the list of records into a convenience var.
var records = json.extattrs;

var newObj = {};
for (var i = 0; i < keeperFields.length; i++) {
    if (records.hasOwnProperty(keeperFields[i])) {
        if (keeperFields[i] == "IP Subnet") {
            newObj["network"] = String(Object.values(records[keeperFields[i]]));
        }
        if (keeperFields[i] == "Config Services") {
            name = String(Object.values(records["IP Subnet"])).split('.');
            name.pop();
            name = name.join("_") + "_vlan_" + String(Object.values(records["VLAN Number"]));
            newObj["name"] = name;
        }
        if (keeperFields[i] == "Subnet Mask")
            newObj["mask"] = String(Object.values(records[keeperFields[i]]));
    }
}
newJSON.subnet = newObj;

console.log(JSON.stringify(newJSON));

