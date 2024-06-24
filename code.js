let d = document;
let f = d.getElementById("field");
num_last_id = 0;
let last_id = [];   //{"table": 0, "line": 0} подсчет строк в таблице 


function Table(){
    let div = d.createElement("div");
    div.id = "t[" + num_last_id + "]";    // № таблицы

    let name_t = d.createElement("div");
    name_t.innerHTML = '<input id="name_t" type="text" name="name_table['+num_last_id+']">';

    let table = d.createElement("table");
    last_id.push({table: num_last_id, line: 0});
    //last_id[num_last_id].table = num_last_id;
    //last_id[num_last_id].line = 0;


    let thead = d.createElement("thead");
    let tbody = d.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    div.appendChild(name_t);
    div.appendChild(table);
    f.appendChild(div);

    let row_1 = d.createElement('tr');
    let heading_1 = d.createElement('th');
    heading_1.innerHTML = 'Name';
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = 'Type';
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = 'DataType';
    let heading_4 = document.createElement('th');
    heading_4.innerHTML = 'PK';
    let heading_5 = document.createElement('th');
    heading_5.innerHTML = '';

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    thead.appendChild(row_1);


    //создаем кнопки, которые будут добавлять строки в таблицу нашу
    let btn_add_row = d.createElement('button');
    btn_add_row.type = "button";
    btn_add_row.innerHTML = " + ";
    btn_add_row.id = "btn_" + num_last_id;
    btn_add_row.value = num_last_id;

    btn_add_row.addEventListener('click', Row);
    //btn_add_row.onclick = "Row()";
    div.appendChild(btn_add_row);
    
    num_last_id+=1;
}


function Row(e){
    let num = e.target.value;
    let tbody = d.getElementById("t[" + num + "]").getElementsByTagName('tbody')[0];

    let row = d.createElement("tr");
    row.id = "row[" + num + "][" + last_id[num].line + "]";
    tbody.appendChild(row);
 
    // создаем ячейки в вышесозданной строке
    let td1 = d.createElement("td");
    let td2 = d.createElement("td");
    let td3 = d.createElement("td");
    let td4 = d.createElement("td");
    let td5 = d.createElement("td");
 
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
     
    // добавляем поля в ячейки
    td1.innerHTML = '<input type="text" name="name['+last_id[num].line+']">';
    td2.innerHTML = '<select id="type" name="dataType['+last_id[num].line+']"><option value="0">--Please choose an option--</option><option value="datetime">Datetime</option><option value="num">Number</option><option value="str">String</option></select>';


    td3.innerHTML = '<select id="datatype" name="dataType['+last_id[num].line+']" disabled><option value="0">--Please choose an option--</option></select>';
    
    td4.innerHTML = '<input type="checkbox" name="pk['+ last_id[num].line +']" value="'+ num +" " +last_id[num].line+'">';
    //у кнопки удаления ряда будет value = № таблицы + " " + № строки
    //td5.innerHTML = '<button id="btn_del_row" value='+ num +" " +last_id[num].line+' type="button" onclick="DelRow()">-</button>';

    //редактирование выпадающего списка
    let type = document.querySelectorAll("#type")[document.querySelectorAll("#type").length - 1];
    let datatype = document.querySelectorAll("#datatype")[document.querySelectorAll("#datatype").length - 1];
    all_datatypes = {};
    all_datatypes.datetime = ["DATE", "DATETIME DAY TO DAY", "DATETIME DAY TO FRACTION", "DATETIME DAY TO FRACTION()", "DATETIME DAY TO HOUR", "DATETIME DAY TO SECOND", "DATETIME FRACTION TO FRACTION", "INTERVAL YEAR TO MONTH()", "INTERVAL YEAR()", "TIME"];
    all_datatypes.num = ["BOOLEAN","BYTE","DECIMAL()","FLOAT","HUGE", "INTEGER", "INTERVAL", "LONG","NUMBER","NUMERIC"];
    all_datatypes.str = ["CHAR","CHAR()","LONG TEXT()","NCHAR()","NVARCHAR()","TEXT","TEXT()","VARCHAR()"];

    type.onchange = function(){
        datatype.disabled = false;
        datatype.innerHTML = '<option value="0">--Please choose an option--</option>';
        let dt = type.value;

        //alert(Object.keys(all_datatypes));
        //alert(dt);
        //alert(all_datatypes[dt]);


        if(dt != 0){
            for(let i=0; i<all_datatypes[dt].length; i++){
                datatype.innerHTML += '<option value="'+(i+1)+'">'+all_datatypes[dt][i]+'</option>';
            }
        }else{
            datatype.disabled=true;
        }
    }
    /*if(type != null){
    }*/


    
    let btn_del_row = d.createElement('button');
    btn_del_row.type = "button";
    btn_del_row.innerHTML = "-";
    btn_del_row.id = "btn_del_row";
    btn_del_row.value = num +" " +last_id[num].line;
    btn_del_row.addEventListener('click', DelRow);

    td5.appendChild(btn_del_row);

    last_id[num].line += 1;
}


function DelRow(e){     //Подумать: может стоит пересчитывать строки после удаления и менять их id?
                        //Либо ничего не пересчитывать, но вести в конце (при коныертации) контроль над существованием ячейки
    let num = e.target.value.split(" ");
    let num_t = num[0];
    //alert(num_t);
    let num_r = num[1];
    //alert(num_r);

    let delRow = d.getElementById("row[" + num_t + "][" + num_r + "]");
    delRow.remove();
}