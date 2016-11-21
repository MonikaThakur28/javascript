const readline = require('readline');
const fs = require('fs');
var header =[];
var jsonArray=[];
var tempData={};
var isHeader=true;

/*Reading the .CSV file line by line */
const rl = readline.createInterface({
	input: fs.createReadStream('CSV/Production-Department_of_Agriculture_and_Cooperation_1.csv')
});

/*Callback Function for fetching the data*/
rl.on('line', function(line) {
	
	var lineRecords= line.split(',');
	var dataflag =false;
	/*Getting all the headers from the .CSV file*/
	for(var i=0;i<lineRecords.length;i++)
	{
		if(isHeader)
		{ 
			header[i]=lineRecords[i].trim();
		}
		/*Getting data for required fields*/
		else if((header[i]=="Particulars")|| (/3-/i.test(header[i])))
		{
			/*Getting data for the four Southern states*/
			if(lineRecords[0].includes("Rice Yield Karnataka") || lineRecords[0].includes("Rice Yield Andhra Pradesh") || lineRecords[0].includes("Rice Yield Kerala") || lineRecords[0].includes("Rice Yield Tamil Nadu") )
			{
				if(i==0)
				{
					tempData[header[i]]=lineRecords[i];
				}
				
				 for(i=3;i<25;i++)
				 {
				 	tempData[header[i]]=parseFloat(lineRecords[i+1].replace("NA",0));
				 }	
				dataflag=true;
			}
		}         
	}

		/*Pushing the data and creating the JSON file*/

	if(dataflag)
	{
		jsonArray.push(tempData);
	}
	isHeader=false;	
	fs.writeFileSync("JSON/southernFourth.json",JSON.stringify(jsonArray),encoding="utf8");
	tempData={};

});