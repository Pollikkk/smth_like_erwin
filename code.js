let d = document;
let f = d.getElementById("field");
num_last_id = 0;
let last_id = [];   //{"table": 0, "line": 0} подсчет строк в таблице 

all_datatypes = {};
all_datatypes.datetime = ["DATE", "DATETIME DAY TO DAY", "DATETIME DAY TO FRACTION", "DATETIME DAY TO FRACTION()", "DATETIME DAY TO HOUR", "DATETIME DAY TO SECOND", "DATETIME FRACTION TO FRACTION", "INTERVAL YEAR TO MONTH()", "INTERVAL YEAR()", "TIME"];
all_datatypes.num = ["BOOLEAN","BYTE","DECIMAL()","FLOAT","HUGE", "INTEGER", "INTERVAL", "LONG","NUMBER","NUMERIC"];
all_datatypes.str = ["CHAR","CHAR()","LONG TEXT()","NCHAR()","NVARCHAR()","TEXT","TEXT()","VARCHAR()"];


// создаём модальное окно
const modal = new ItcModal({
    title: 'sql-код',
    content: '',
    footerButtons: [
      { class: 'btn-copy', text: 'Копировать', action: 'copy' },
    ]
  });


function Table(){
    let div = d.createElement("div");
    div.id = "t[" + num_last_id + "]";    // № таблицы

    let name_t = d.createElement("div");
    name_t.innerHTML = '<input class="name_t" id="name_table['+num_last_id+']" type="text" name="name_table['+num_last_id+']">';

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
    td1.innerHTML = '<input type="text" name="name['+ last_id[num].table +']['+last_id[num].line+']">';
    td2.innerHTML = '<select id="type" name="Type['+ last_id[num].table +']['+last_id[num].line+']"><option value="0">--Please choose an option--</option><option value="datetime">Datetime</option><option value="num">Number</option><option value="str">String</option></select>';


    td3.innerHTML = '<select id="datatype" name="dataType['+ last_id[num].table +']['+last_id[num].line+']" disabled><option value="0">--Please choose an option--</option></select>';
    
    td4.innerHTML = '<input type="checkbox" name="pk['+ last_id[num].table +']['+ last_id[num].line +']" value="'+ num +" " +last_id[num].line+'">';
    //у кнопки удаления ряда будет value = № таблицы + " " + № строки
    //td5.innerHTML = '<button id="btn_del_row" value='+ num +" " +last_id[num].line+' type="button" onclick="DelRow()">-</button>';

    //редактирование выпадающего списка
    let type = document.querySelectorAll("#type")[document.querySelectorAll("#type").length - 1];
    let datatype = document.querySelectorAll("#datatype")[document.querySelectorAll("#datatype").length - 1];

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
                        //Либо ничего не пересчитывать, но вести в конце (при конвертации) контроль над существованием ячейки
    let num = e.target.value.split(" ");
    let num_t = num[0];
    //alert(num_t);
    let num_r = num[1];
    //alert(num_r);

    let delRow = d.getElementById("row[" + num_t + "][" + num_r + "]");
    delRow.remove();
}


//Перевод в sql-код
function Sql(){
    let allInp = d.getElementsByTagName("input");   //раскрашивает красные (незаполненные) до этого поля в белый, если они заполнены
    let allSel = d.getElementsByTagName("select");
    let tables = d.getElementsByTagName("div");

    if(allInp!=null){
        for(let i=0; i<allInp.length; i++){
            allInp[i].style.backgroundColor = "rgb(255, 255, 255)";
        }
    }
    if(allSel!=null){
        for(let i=0; i<allSel.length; i++){
            allSel[i].style.backgroundColor = "rgb(255, 255, 255)";
        }
    }
    if(tables!=null){
        for(let i=0; i<tables.length; i++){
            tables[i].style.boxShadow = "";
        }
    }


    //проверка, есть ли вообще хоть 1 таблица
    if(f.innerHTML == ''){
        alert("Рабочее поле пусто!");
        return;
    }
    else{
        //Проверка на пустые поля в таблице
        let Err = 0;//флаг, указывающий есть ли ошибка
        
        for(let i=0; i<last_id.length; i++){
            let tab = d.getElementById("t["+ i + "]");  //получили таблицу
            let name_tab = d.getElementById("name_table["+i+"]");   
            //name_tab.style.backgroundColor = "rgb(244, 123, 123)";
            if(name_tab.value == ''){   //проверяем название таблицы
                name_tab.style.backgroundColor = "rgb(244, 123, 123)";
                Err = 1;
            }
            //alert(last_id[i]["line"]);
            for(let j=0; j<last_id[i]["line"]; j++){  //проверяем поля таблиц
                let td1 = d.getElementsByName("name["+i+"]["+j+"]")[0];
                let td2 = d.getElementsByName("Type["+i+"]["+j+"]")[0];
                let td3 = d.getElementsByName("dataType["+i+"]["+j+"]")[0]; 
                if(td1!=null){
                    if(td1.value == ''){  
                        td1.style.backgroundColor = "rgb(244, 123, 123)";
                        Err = 1;
                    }
                    if(td2.value == "0"){  
                        td2.style.backgroundColor = "rgb(244, 123, 123)";
                        Err = 1;
                    }
                    if(td3.value == "0"){  
                        td3.style.backgroundColor = "rgb(244, 123, 123)";
                        Err = 1;
                    }
                }
            }
        }

        if(Err==1){ //выходим, если есть хоть одна незаполненная ячейка
            alert("Есть незаполненные поля!");
            return;
        }

        //если все данные заполнены генерируем sql-код:
        let sql_code='';
        
        //получаем поля таблиц
        for(let i=0; i<last_id.length; i++){
            let pk_s = [];  //тут будем помечать pk
            let tab = d.getElementById("t["+ i + "]");  //получили таблицу
            let name_tab = d.getElementById("name_table["+i+"]"); 
            if(tab!=null){
                sql_code += 'CREATE TABLE ' + name_tab.value + '\n(\n' ;
            }
            else{continue;}
              
            for(let j=0; j<last_id[i]["line"]; j++){  //проверяем поля таблиц
                let td1 = d.getElementsByName("name["+i+"]["+j+"]")[0];
                let td2 = d.getElementsByName("Type["+i+"]["+j+"]")[0];
                let td3 = d.getElementsByName("dataType["+i+"]["+j+"]")[0]; 
                let td4 = d.getElementsByName("pk["+i+"]["+j+"]")[0]; 

                if(td1!=null){
                    sql_code += "\u00a0\u00a0\u00a0\u00a0" + td1.value + ' ' + td3.options[td3.selectedIndex].text + '\n';

                    if(td4.checked){
                        pk_s.push(td1.value);
                    }
                }
                
            }
            sql_code += '\n);\n' ;
            //перебираем pk
            if(pk_s.length == 0){   //если забыли указать, выходим
                alert("Вы забыли указать PK");
                //подсветить...
                tab.style.boxShadow = '0 0 20px red';
                return;
            }
            /*sql_code += '\nCREATE UNIQUE INDEX XPK'+name_tab.value+' ON '+ name_tab.value+'\n(';
            for(let i=0; i<pk_s.length; i++){   //если все хорошо
                sql_code += '\n'+"\u00a0\u00a0\u00a0\u00a0"+pk_s[i]+' ASC';
            }
            sql_code += '\n);\n';*/

            sql_code += '\nALTER TABLE ' + name_tab.value;
            for(let i=0; i<pk_s.length; i++){   
                sql_code += '\n'+"\u00a0\u00a0\u00a0\u00a0"+'ADD CONSTRAINT XPK'+name_tab.value+' PRIMARY KEY ('+pk_s[i]+');\n\n';
            }

        }

        //alert(sql_code);    //для проверки

        // добавляем содкржимое при открытии модального окна
        modal.setBody(`<div id='sql_code' style='white-space:pre'>${sql_code}</div>`);

        //добавляем действие для кнопки копировать
        document.addEventListener('click', (e) => {
            // при клике по кнопке копировать
            if (e.target.closest('[data-action="copy"]')) {
                navigator.clipboard.writeText(sql_code);    //d.getElementById("sql_code").innerText
            }
          });

        // откроем модальное окно
        modal.show();
    }
}