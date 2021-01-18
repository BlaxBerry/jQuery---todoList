$(function() {
    // 页面刷新自动追加liad
    loadData();

    // 页面背景图下拉上拉动画
    // 点击input背景图上拉，内容盒子下拉
    $("input").on("click", function() {
        $(".wrap").slideUp(700, function() {
            $(".container").slideDown(700);
        });
    });
    // 点击logo背景图下拉，内容盒子上拉
    $(".title").on("click", function() {
        $(".container").slideUp(700, function() {
            $(".wrap").slideDown(700)
        });
    });


    // tab栏切换doing done
    $(".tab_btns button").on("click", function() {
        $(this).addClass("btnClick").siblings().removeClass("btnClick");

        var index = $(this).index();
        $(".tab_content .tab_content_item").eq(index).slideDown(700).siblings().hide();
    })


    //用来存放用户输入的数据，和从LocalStorage拿来的本地数据。
    var data = []

    //点击回车键Enter获得input的内容
    $(".header input").on("keyup", function(e) {
        if (e.keyCode === 13) {
            if ($(this).val().trim() == "") {
                alert("Please input something");
            } else {
                var value = $(".header input").val();
                //获得本地存储的数据(数组形式)
                var localData = getData();
                //把用户的新数据 追加给拿出来的本地存储数据
                //{className:bg_lis,content:value}
                //{className:"",content:value}
                localData.push({ content: value, bgc: false });
                //把更新的数据在存入本地存储，替换原有的本地存储
                //作用域不同，当作参数传入
                saveData(localData);
                //从本地储存拿到数据，渲染给HTML
                loadData();
                $(this).val("")
            }
        }
    });

    //保存 数据到 本地存储
    //把数据先转换成字符串格式，存到LocalStorage
    // 参数
    function saveData(data) {
        localStorage.setItem("todo", JSON.stringify(data));
    }

    // 获得 数据  从本地存储
    //把本地存储的字符串转换为对象格式
    function getData() {
        if (localStorage.getItem("todo") !== null) {
            return JSON.parse(localStorage.getItem("todo"));
        } else {
            return []
        }
    }

    //把本地储存的数据 加载到页面HTML
    function loadData() {
        // 要先拿到本地数据 
        //{className:"",content:value}
        var data = getData();
        //在追加li之前，先清空ul，ol
        $("ul,ol").empty();
        //遍历，得到对象形式的数据的每一个元素
        $.each(data, function(i, domELe) {
            //创建序号个数的li 
            //并赋值每一个元素（对象）的属性值
            // 给<a>添加一个和序号属性，后面可获得指定的a
            // 根据li的bgc属性值，分别放入ul/ol
            if (domELe.bgc == false) {
                var li = $("<li><p>" + domELe.content + "</p><a href='javascript:;' index=" + i + ">X</a></li>");
                $("ul").prepend(li);
            } else {
                var li = $("<li><p>" + domELe.content + "</p><a href='javascript:;' index=" + i + ">X</a></li>");
                $("ol").prepend(li);
            }
        });
    }

    //删除li
    //删除本地存储的数据
    $("ul,ol").on("click", "a", function(e) {
        e.stopPropagation();
        //先获取本地存储
        var data = getData();
        var index = $(this).attr("index");
        //修改拿到的本地存储数据
        data.splice(index, 1);
        // 保存替换本地存储数据
        saveData(data);
        // 渲染页面HTMl
        loadData();
    })

    // 添加DONE列表
    // 利用li的自定义属性bgc =true/false
    $("ul,ol").on("click", "li", function(e) {
        //点击小li，添加自定义属性

        $(this).attr("bgc", true).siblings("li").attr("bgc", false)

        //先获取本地储存
        var data = getData();
        console.log(data);

        // 修改获得的本地储存
        //{className:"",content:value}
        var index = $(this).children("a").attr("index")
        if (data[index].bgc) {
            data[index].bgc = false;
        } else {
            data[index].bgc = true;
        }

        // 保存到本地储存
        saveData(data);

        // 渲染HTML
        // 根据自定义属性true/fasle 分别放入不同ulol
        loadData();
    });











});