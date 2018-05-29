var person = [
    { name: '刘小华', src: '1.jpg', sex: 'Male', des: '漂亮的女孩子' },
    { name: '王花', src: '2.jpg', sex: 'Male', des: '漂亮的程序猿' },
    { name: '陈军', src: '3.jpg', sex: 'Female', des: '我是一个学霸' },
    { name: '王华', src: '4.jpg', sex: 'Female', des: '我喜欢游泳' },
    { name: '陈思思', src: '5.jpg', sex: 'Male', des: '我喜欢看电影' },
    { name: '陈学习', src: '6.jpg', sex: 'Female', des: '我爸我妈爱学习' },
    { name: '王美丽', src: '7.jpg', sex: 'Male', des: '我妈是美丽得妈妈' }
];

var show = document.getElementById('show');
var list = document.getElementById('list');
var inp = document.getElementById('inp');

render(person);

// 渲染数据
function render(arr){
    var str = '';
    arr.forEach(function (ele, index){
        str += '\
            <ul>\
                <li><img src="img/'+ele.src+'" alt=""></li>\
                <li>'+ele.name+'</li>\
                <li>'+ele.des+'</li>\
            </ul>';
    })
    show.innerHTML = str;
}

// 监控input
inp.oninput = function (){
    state['text'] = this.value;
    render(addfn());
}

//输入内容过滤器
function filterText(text, arr){
    //返回符合条件的数据的数组
    return arr.filter(function (ele, index){
        //如果该字符串存在
        if(ele.name.indexOf(text) != -1){
            return true;
        }else if(ele.des.indexOf(text) != -1){
            return true;
        }
    })
}

list.addEventListener('click', function (e){
    if(e.target.tagName == 'LI'){
        state['sex'] = e.target.innerText;
        document.getElementsByClassName('active')[0].className = '';
        e.target.className = 'active';
        render(addfn());
    }
})

//性别过滤器
function filterSex(sex, arr){
    //返回符合条件的数据的数组
    return arr.filter(function (ele, index){
        if(sex == 'ALL'){
            return true;
        }else{
            //如果该字符串存在
            if(ele.sex.indexOf(sex) != -1){
                return true;
            }
        }
        
    })
}



var state = {
    text: '',
    sex: 'ALL'
}

var objFilter = {
    text: filterText,
    sex: filterSex
}

function addfn(){
    var lastArr = person;
    for(var prop in objFilter){
        lastArr = objFilter[prop](state[prop], lastArr);
    }
    return lastArr;
}