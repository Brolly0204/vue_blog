<template>
  <div class="container">
    <h3 class="title">发布一篇新的文章</h3>
    <!-- 文章类型 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
      <el-form-item label="文章分类" prop="category" class="category">
        <el-select v-model="categoryId"
           placeholder="请选择文章分类"
           @change="selectVal()"
        >
          <el-option v-for="(cate, ind) in categorys" :key="cate.id" :label="cate.get('name')" :value="cate.get('objectId')">
          </el-option>
        </el-select>
      </el-form-item>

      <!-- 文章标题 -->
      <el-form-item label="文章标题" prop="title" class="articleTile">
        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>

      <div class="el-form-item is-required" :class="{ 'is-error': validate.error }">
        <label class="el-form-item__label">文章内容</label>

        <!-- 编辑区 -->
        <div class="el-form-item__content">
          <div id="editor"></div>
          <!-- 文章内容 为空时 进行提示 -->
          <div v-if="validate.error" class="el-form-item__error">正文怎能没有内容呢？</div>
        </div>
      </div>

      <div class="operator right">
        <el-button class="submit" type="primary" @click="submit" @keyup.enter="submit">发布文章</el-button>
      </div>

    </el-form>
  </div>
</template>

<script>
  import $ from 'jquery'
  import wangEditor from 'wangeditor'
  import {mapState} from 'vuex';

  let editor = null;

  export default {
    name: 'create',
    data() {
      return {
        categoryId: null,
        categorys: [], // 类型集合
        form: {
          category: '',
          title: '',
        },
        rules: {
          title: [
            {required: true, message: "必须填写标题哦!", trigger: 'blur'},
          ],
          category: [
            {type: 'object', required: true, message: "必须填写分类哦!", trigger: 'blur'},
          ],
        },
        validate: {
          error: false
        }
      };
    },
    created() {
      this.getCategory();
    },
    mounted() {
      this.initEditor();
    },
    computed: mapState(['user']),
    methods: {
      selectVal() {
         this.form.category = this.categorys.find(item => item.get('objectId') === this.categoryId);
//         console.log(this.categoryId);
//         console.log(this.form.category);
      },
      content() {
        return this.editor.txt.html();
      },
      initEditor() {
        let that = this;
        this.editor = new wangEditor('#editor');
//        // 自定义菜单配置
//        editor.customConfig.menus = [
//          'head',
//          'bold',
//          'italic',
//          'underline'
//        ];
        this.editor.customConfig.onchange = function (html) {
          // html 即变化之后的内容
//          console.log(html);
          that.validateContent();
        };
        this.editor.create(); // 创建文本编辑器

      },
      getCategory() {
        const cq = new this.$api.SDK.Query('Category'); // 获取文章分类
        cq.find().then((categorys) => {
          this.categorys = categorys;
          this.categoryId = categorys[0].get('objectId'); // 设置默认显示分类
          this.form.category = categorys[0];
        }).catch(console.error)
      },

      validateContent() { // 编辑器文本内容验证
        let text = this.editor.txt.text();
        if (/^s*$/g.test(text)) {
          this.validate.error = true; //
          $('.wangEditor-container').css({borderColor: 'red'});
          return;
        }

        this.validate.error = false;
        $('.wangEditor-container').css({borderColor: '#ccc'})
      },

      createArticle() {
        console.log(this.form.category);
        // 添加文章 到 服务端
        const article = new this.$api.SDK.Object('Article'); // 获取Article Api
        article.set('author', this.user);
        article.set('title', this.form.title);
        article.set('content', this.content());
        article.set('category', this.form.category);
        return article;
      },

      setACL(article) {
        // 设置访问权限
        // https://leancloud.cn/docs/acl-guide.html#单用户权限设置
        let acl = new this.$api.SDK.ACL();
        acl.setPublicReadAccess(true);
        acl.setWriteAccess(this.user, true);
        article.setACL(acl);
      },

      save(article) {
        article.save().then((article) => {
          // console.log(article);
          const message = `文章《${article.get('title')}》发布成功`;
          this.$message({message, type: 'success'})
        }).catch(console.error);
      },

      submit() { // 发表文章
        this.$refs.form.validate((valid) => {
          this.validateContent();
          if (valid) {
            const article = this.createArticle(); // 文章对象
            this.setACL(article); // 设置 可读可写权限
            this.save(article); // 将文章推送到后台
          } else {
            // console.log('error submit!!');
            this.$message.error('错了哦，您填写的信息有错误，请按照提示修改。');
            return false;
          }
        })

      }
    },
  };
</script>

<style lang="less" scoped>
  .container {
    text-align: left;
    padding: 0 10%;
    .operator {
      margin-top: 20px;
      float: right;
    }
    .category, .articleTile {
        margin: 50px 0;
    }
    #editor {
      min-height: 300px;
    }
    .title {
      margin: 20px;
      text-align: center;
    }
  }

</style>
