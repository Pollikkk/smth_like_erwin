all_datatypes = {};
var type = document.getElementById("type");
type.onchange = function(){
    alert('hi');
}
var datatype = document.getElementById("datatype");

all_datatypes.datetime = ["DATE", "DATETIME DAY TO DAY", "DATETIME DAY TO FRACTION", "DATETIME DAY TO FRACTION()", "DATETIME DAY TO HOUR", "DATETIME DAY TO SECOND", "DATETIME FRACTION TO FRACTION", "INTERVAL YEAR TO MONTH()", "INTERVAL YEAR()", "TIME"];
all_datatypes.num = ["BOOLEAN","BYTE","DECIMAL()","FLOAT","HUGE", "INTEGER", "INTERVAL", "LONG","NUMBER","NUMERIC"];
all_datatypes.str = ["CHAR","CHAR()","LONG TEXT()","NCHAR()","NVARCHAR()","TEXT","TEXT()","VARCHAR()"];

if(type != null){
    type.onchange = function(){
        datatype.disabled = false;
        datatype.innerHTML = '<option value="0">--Please choose an option--</option>';
        let dt = this.value;
        if(dt != 0){
            for(let i=0; i<all_datatypes.dt.length; i++){
                datatype.innerHTML += '<option value="'+(i+1)+'">'+all_datatypes.dt[i]+'</option>';
            }
        }else{
            datatype.disabled=true;
        }
    }
}
