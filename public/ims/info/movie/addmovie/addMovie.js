define(function(require, exports) {

    var $ = require("easyui");

    var movie = {};

    function init() {
        $("#cName").textbox({
            value: "星球大战外传：侠盗一号",
            width: 500
        });
        $("#eName").textbox({
            value: "Rogue One: A Star Wars Story",
            width: 500
        });
        $("#type").textbox({
            value: "动作,冒险,科幻",
            width: 500
        });
        $("#country").textbox({
            value: "美国",
            width: 500
        });
        $("#duration").textbox({
            value: "134分钟",
            width: 500
        });
        $("#release").textbox({
            value: "2017-01-06大陆上映",
            width: 500
        });
        $("#synopsis").textbox({
            value: "本片讲述了在战火频燃、 纷争不断的动荡时代， 一群豪杰志士集结在义军的旗帜下， 联合窃取毁灭性武器“ 死星” 的机密设计图并以此来推翻银河帝国统治的故事。 这是一个共和体制覆灭、 绝地武士崩溃的时代， 自帕尔帕廷以所谓的新秩序将银河共和国改组为银河帝国之后， 在银河帝国的高压统治下， 众多反抗者聚集起各类起义组织， 这其中就有蒙· 莫思马（ 金妮韦芙· 奥蕾利 饰） 领导下的“ 义军同盟”。 各种反抗运动使得银河帝国不得不拿出各种应对措施来镇压起义者， 而这其中最为残暴的方式就是战斗空间站“ 死星”。 蒙· 莫思马为此集结了一支窃取“ 死星” 设计图的小组， 而落入“ 义军同盟” 的叛逆女孩琴· 厄索（ 菲丽希缇· 琼斯 饰） 机缘巧合地被招募为执行此次绝密任务的人选。 琴· 厄索与一群英勇无畏的有志之士踏上了一条异常艰险的抗争之旅。 面对绝密行动诸多的未知因素，“ 义军同盟” 又将如何度过难关…… ",
            width: 500,
            height: 100,
            multiline: true
        });
        $('#addImgBtn')
            .linkbutton({
                disabled: true
            })
            .on("click", function(e) {
                e.preventDefault();
                if (movie._id) {
                    require("router").go(`#/info/movie/img/${movie._id}`)
                }
            });

        $('#saveBtn')
            .linkbutton()
            .on("click", function(e) {
                e.preventDefault();
                addMovie();
                // console.log(getMovie())
            });
        $('#resetBtn')
            .linkbutton()
            .on("click", function(e) {
                e.preventDefault();
                clearInput()
            });
    }

    function getMovie() {
        return {
            cName: $("#cName").val(),
            eName: $("#eName").val(),
            type: $("#type").val(),
            country: $("#country").val(),
            duration: $("#duration").val(),
            release: $("#release").val(),
            synopsis: $("#synopsis").val()
        }
    }
    //保存电影信息
    function addMovie() {
        $.ajax({
            url: "/movies/addMovie",
            type: "post",
            data: getMovie(),
            success: function(data) {
                movie = data;
                setImgBtnState()
            }
        })
    }

    function setImgBtnState() {
        $('#addImgBtn')
            .linkbutton({
                disabled: false
            })
    }

    //清除输入控件
    function clearInput() {
        $("#cName").textbox({
            value: "",
        });
    }

    exports.load = function() {
        $(".movie-detail").load("/ims/info/movie/addMovie/addMovie.html", function() {
            init();
        })
    };

})