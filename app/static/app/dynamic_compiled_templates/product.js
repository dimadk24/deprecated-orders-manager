!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).product=n({1:function(n,l,a,e,t){var r,i=null!=l?l:n.nullContext||{},s=a.helperMissing,u="function",p=n.escapeExpression;return'            <button class="button product__choose-type-button" value="'+p(typeof(r=null!=(r=a.id||(null!=l?l.id:l))?r:s)===u?r.call(i,{name:"id",hash:{},data:t}):r)+'">\r\n                '+p(typeof(r=null!=(r=a.name||(null!=l?l.name:l))?r:s)===u?r.call(i,{name:"name",hash:{},data:t}):r)+"\r\n            </button>\r\n"},3:function(n,l,a,e,t){var r;return'            <span>\r\n                Ещё нету типов товаров, <a href="'+n.escapeExpression("function"==typeof(r=null!=(r=a.createProductTypeLink||(null!=l?l.createProductTypeLink:l))?r:a.helperMissing)?r.call(null!=l?l:n.nullContext||{},{name:"createProductTypeLink",hash:{},data:t}):r)+'"\r\n                >создай первый</a>!\r\n            </span>\r\n'},compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var r,i,s=null!=l?l:n.nullContext||{},u=a.helperMissing,p="function",c=n.escapeExpression;return'<section class="product" data-product-type-chosen="false">\r\n    <div class="product__close-wrapper">\r\n        <i class="icon-close product__close"></i>\r\n    </div>\r\n    <div class="product__inputs">\r\n        <label for="name-input-'+c(typeof(i=null!=(i=a.id||(null!=l?l.id:l))?i:u)===p?i.call(s,{name:"id",hash:{},data:t}):i)+'" class="name-label">\r\n        Имя товара\r\n        <input type="text" id="name-input-'+c(typeof(i=null!=(i=a.id||(null!=l?l.id:l))?i:u)===p?i.call(s,{name:"id",hash:{},data:t}):i)+'" class="name-input" disabled>\r\n    </label>\r\n        <label for="price-input-'+c(typeof(i=null!=(i=a.id||(null!=l?l.id:l))?i:u)===p?i.call(s,{name:"id",hash:{},data:t}):i)+'">\r\n            Цена товара\r\n            <input type="text" id="price-input-'+c(typeof(i=null!=(i=a.id||(null!=l?l.id:l))?i:u)===p?i.call(s,{name:"id",hash:{},data:t}):i)+'" class="price-input">\r\n        </label>\r\n        <label for="purchase-price-input-'+c(typeof(i=null!=(i=a.id||(null!=l?l.id:l))?i:u)===p?i.call(s,{name:"id",hash:{},data:t}):i)+'">\r\n            Закупочная цена товара\r\n            <input type="text" id="purchase-price-input-'+c(typeof(i=null!=(i=a.id||(null!=l?l.id:l))?i:u)===p?i.call(s,{name:"id",hash:{},data:t}):i)+'" class="purchase-price-input">\r\n        </label>\r\n        <label for="number-input-'+c(typeof(i=null!=(i=a.id||(null!=l?l.id:l))?i:u)===p?i.call(s,{name:"id",hash:{},data:t}):i)+'">\r\n            Количество товаров\r\n            <input type="number" id="number-input-'+c(typeof(i=null!=(i=a.id||(null!=l?l.id:l))?i:u)===p?i.call(s,{name:"id",hash:{},data:t}):i)+'" class="number-input">\r\n        </label>\r\n    </div>\r\n    <span class="product__type">Тип товара</span>\r\n    <section class="product__buttons-wrapper">\r\n'+(null!=(r=a.each.call(s,null!=l?l.types:l,{name:"each",hash:{},fn:n.program(1,t,0),inverse:n.noop,data:t}))?r:"")+(null!=(r=a.unless.call(s,null!=(r=null!=l?l.types:l)?r.length:r,{name:"unless",hash:{},fn:n.program(3,t,0),inverse:n.noop,data:t}))?r:"")+'    </section>\r\n    <label for="comment-area-'+c(typeof(i=null!=(i=a.id||(null!=l?l.id:l))?i:u)===p?i.call(s,{name:"id",hash:{},data:t}):i)+'">\r\n        Комментарий\r\n        <textarea id="comment-area-'+c(typeof(i=null!=(i=a.id||(null!=l?l.id:l))?i:u)===p?i.call(s,{name:"id",hash:{},data:t}):i)+'" cols="30" rows="3" class="comment-area"></textarea>\r\n    </label>\r\n</section>\r\n'},useData:!0})}();