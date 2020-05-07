function easySlide(container, data, config) {
    var containerDom = document.querySelector(container); // 取到放置 slide 的容器
    var len = data.length, // 数据的数量
        index = 0, // 控制轮播的索引
        timer = null; // 定时器

    // 默认配置
    var setting = {
        navigation: true,
        pagination: true,
        autoplay: true,
        delay: 3000
    }
    // 合并配置
    for (key in config) {
        setting[key] = config[key];
    }

    // 创建 slide-wrap
    var wrap = createWrap(containerDom);
    // 创建 slide-list
    var slideList = createList(wrap);
    // 创建 slide-list-item
    var slideListItem = createListItem(slideList);

    // 判断配置 实现前后切换
    if (setting.navigation) {
        // 创建 DOM
        var navigation = createNavigation(wrap);
        var prev = navigation[0];
        var next = navigation[1];
        prev.addEventListener("click", function () {
            index--;
            if (index < 0) {
                index = len - 1;
            }
            toggle(index);
        })
        next.addEventListener("click", function () {
            index++;
            if (index == len) {
                index = 0;
            }
            toggle(index);
        })
    }

    // 判断配置 实现索引按钮切换
    if (setting.pagination) {
        // 创建 DOM
        var pages = createPages(wrap);
        var btn = pages.children;
        for (var i = 0; i < len; i++) {
            (function (i) {
                btn[i].addEventListener("click", function () {
                    index = i;
                    toggle(index);
                })
            })(i);
        }
    }

    // 判断配置 实现自动轮播
    if (setting.autoplay) {
        wrap.addEventListener("mouseover", function () {
            clearInterval(timer);
        })
        wrap.addEventListener("mouseout", function () {
            timer = timerToggle();
        })
        timer = timerToggle();
    }

    // 自动轮播
    function timerToggle() {
        return setInterval(function () {
            index++;
            if (index == len) {
                index = 0;
            }
            toggle(index);
        }, setting.delay);
    }

    // 切换功能
    function toggle(i) {
        for (var j = 0; j < len; j++) {
            slideListItem[j].classList.remove("current");
        }
        slideListItem[i].classList.add("current");

        if (setting.pagination) {
            for (var j = 0; j < len; j++) {
                btn[j].classList.remove("current");
            }
            btn[i].classList.add("current");
        }
    }

    // 创建 slide-wrap
    function createWrap(parent) {
        var div = document.createElement("div");
        div.classList.add("slide-wrap");
        parent.appendChild(div);
        return div;
    }
    // 创建 slide-list
    function createList(parent) {
        var div = document.createElement("div");
        div.classList.add("slide-list");
        parent.appendChild(div);
        return div;
    }
    // 创建 slide-list-item
    function createListItem(parent) {
        var div;
        for (var i = 0; i < len; i++) {
            div = document.createElement("div");
            div.classList.add("slide-list-item");
            div.innerHTML = "<a href='" + data[i].link + "'><img src='" + data[i].imgUrl + "'></a>";
            parent.appendChild(div);
        }
        parent.children[0].classList.add("current");
        return parent.children;
    }
    // 创建 slide-prev slide-next
    function createNavigation(parent) {
        var prev = document.createElement("div");
        prev.classList.add("slide-prev");
        var next = document.createElement("div");
        next.classList.add("slide-next");
        parent.appendChild(prev);
        parent.appendChild(next);
        return [prev, next];
    }
    // 创建 slide-pages
    function createPages(parent) {
        var div = document.createElement("div");
        div.classList.add("slide-pages");
        for (var i = 0; i < len; i++) {
            div.innerHTML += "<span></span>";
        }
        div.children[0].classList.add("current");
        parent.appendChild(div);
        return div;
    }
    // 创建 style
    (function () {
        // 判断页面中是否已经添加过 style
        var styles = document.head.querySelectorAll("style");
        for (var i = 0; i < styles.length; i++) {
            if (styles[i].hasAttribute("data-name") && styles[i].getAttribute("data-name") == "slide") {
                return;
            }
        }

        // 在 title 后添加
        var pos = document.head.querySelector("title").nextElementSibling;
        var style = document.createElement("style");
        style.setAttribute("data-name", "slide");
        document.head.insertBefore(style, pos);

        style.innerText = '.slide-wrap{position:relative;width:100%;height:100%}.slide-wrap .slide-list{position:relative;width:100%;height:100%}.slide-wrap .slide-list .slide-list-item{position:absolute;top:0;left:0;z-index:2;width:100%;height:100%;opacity:0;-webkit-transition:opacity .3s;transition:opacity .3s}.slide-wrap .slide-list .slide-list-item img{display:block;width:100%;height:100%}.slide-wrap .slide-list .slide-list-item.current{z-index:3;opacity:1}.slide-wrap .slide-prev,.slide-wrap .slide-next{position:absolute;top:50%;z-index:9999;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:60px;height:60px;margin-top:-30px;cursor:pointer}.slide-wrap .slide-prev::before,.slide-wrap .slide-next::before{content:"";width:50%;height:50%;border:3px solid;border-color:transparent;border-top-color:#fff;border-radius:6px;-webkit-box-sizing:border-box;box-sizing:border-box;opacity:.3;-webkit-transition:all .3s;transition:all .3s}.slide-wrap .slide-prev:hover::before,.slide-wrap .slide-next:hover::before{opacity:1}.slide-wrap .slide-prev{left:0}.slide-wrap .slide-prev::before{margin-left:16px;border-left-color:#fff;-webkit-transform:rotateZ(-45deg);transform:rotateZ(-45deg)}.slide-wrap .slide-prev:hover::before{margin-left:6px}.slide-wrap .slide-next{right:0}.slide-wrap .slide-next::before{margin-left:-16px;border-right-color:#fff;-webkit-transform:rotateZ(45deg);transform:rotateZ(45deg)}.slide-wrap .slide-next:hover::before{margin-left:-6px}.slide-wrap .slide-pages{position:absolute;bottom:15px;left:0;z-index:9999;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.slide-wrap .slide-pages span{width:10px;height:10px;border-radius:50%;background-color:rgba(255,255,255,0.5);margin:0 5px;cursor:pointer}.slide-wrap .slide-pages span.current{background-color:#fff;-webkit-box-shadow:0 0 0 3px rgba(255,255,255,0.3);box-shadow:0 0 0 3px rgba(255,255,255,0.3)}';

    })();

}