(function($) {


  if(window.location.href.indexOf("?category=") > -1) {
    let newPaths = window.location.href.split("?");
    newPaths.shift();
    let queryParams = newPaths.join("").split("&");
    queryParams.forEach(function(param, index) {
    if (param.indexOf("category") > -1) {
        let filterKey = param.split("=")[1];
        filterProducts(filterKey);
    }
    });
  };


  // Category filtering onclick handler
  function filterProducts(product, selector) {

    $('.cat-item').removeClass('active');
    $('.cat-item').each(function(index, e) {
      let catItem = $(this);
      let pathList = $(this).children("a")[0];
      let categorySelector = $(pathList).attr("href").split("/");
      let cat, subcat;
      console.log(categorySelector);
      categorySelector.forEach(function(pathName, index) {
        if (pathName === "products") {
          cat = categorySelector[index];
        }

        else if(pathName === "product-category") {
          cat = categorySelector[index + 1];
          if (categorySelector[index + 3] === "") {
            subcat = categorySelector[index + 2];
          }
        }

        if (product === subcat) {
          $(catItem).addClass('active');
          $(catItem).parent().parent().addClass('active');
        }

        // if (pathList.indexOf("data-show-all") > -1) {
        //   console.log("triggering products if statement!")
        //   $('.cat-item').removeClass('active');
        //   $('.product').parent().css('display', 'block');
        // }

        else if (product === cat) {
          $(catItem).addClass('active');
        }
      });
    });

    //$('.cat-item').removeClass('active');
    // selector.parent().addClass('active');

     // if ( typeof selector.data('showAll') !== 'undefined' ) {
     //   $('.product').parent().css('display', 'block');
    // } else {

    //   // let isChild = selector.closest('ul').hasClass('children');

    //   if (isChild) {
    //     let next = false;
    //     selector.parents().each(function(index) {
    //       if ( $(this).hasClass('cat-item') ) {
    //         if (next) {
    //           $(this).addClass('active');
    //         } else {
    //           next = true;
    //         }
    //       }
    //     });
    // }

       $('.product').parent().css('display', 'none');
       $('.product_cat-' + product).parent().css('display', 'block');
    // }
  };


  $('.product-cats .cat-item > a').on('click', function(e) {
    e.preventDefault();

    let paths = $(this).attr('href').split('/');
    let category = paths[paths.length - 2];
    filterProducts(category, ($(this)));
    window.history.pushState({product: category}, 'Products Archive - Encanto Green Cross', ('?category=' + category));
  });

  // Displays product's "info popup" on the archive-product page
  $('[data-show-info]').on('click', function(e) {
    e.preventDefault();

    let active = $(this).closest('.product').find('.product-info-popup').hasClass('active');

    if (active) {
      let height = $(this).closest('.product').outerHeight(false);
      $(this).closest('.product').find('.product-info-popup').removeClass('active');
      $(this).closest('.product').find('.product-info-popup').css('margin-top', height + 'px');
    } else {
      $(this).closest('.product').find('.product-info-popup').addClass('active');
      $(this).closest('.product').find('.product-info-popup').css('margin-top', '0');
    }
  });

  // Add event listener on window resize so we can keep the styling correct
  // on all animated elements.
  $(window).on('resize', handleResize);
  handleResize();

  // Adds some styling necessary for the css animations to work
  function handleResize(e) {
    let tallest = 0;
    let marginTop;

    $('.product .product-info-popup').each(function(index) {
      $(this).closest('.product').attr('style', null);
      let height = $(this).height();

      if (height > tallest) {
        tallest = height;
      }
    });

    $('.product').each(function(index) {
      let paddingTop = $(this).css('padding-top');
      let paddingBottom = $(this).css('padding-bottom');

      marginTop = tallest + parseInt(paddingTop) + parseInt(paddingBottom);
    });

    $('.product').height(tallest);

    $('.product-info-popup').each(function(index) {
      $(this).css({
        'display': 'block',
        'margin-top': marginTop + 'px'
      })
    });
  }

})( jQuery );