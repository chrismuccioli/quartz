(function(){/* STYLE ROUTES
.................................................*/

// html conventions
Router.route('/styleguide/html', {
  name: 'style_markup' ,
  controller: 'StyleMarkup'
});

// css conventions
Router.route('/styleguide/css', {
  name: 'style_css',
  controller: 'StyleCSS'
});

// colors
Router.route('/styleguide/colors', {
  name: 'style_colors',
  controller: 'StyleColors'
});

// elements
Router.route('/styleguide/elements', {
  name: 'style_elements',
  controller: 'StyleElements'
});

// utilties
Router.route('/styleguide/utilities', {
  name: 'style_utilties',
  controller: 'StyleUtilities'
});

// examples
Router.route('/styleguide/examples', {
  name: 'style_examples',
  controller: 'StyleExamples'
});

// reading
Router.route('/styleguide/reading', {
  name: 'style_reading',
  controller: 'StyleReading'
});

})();