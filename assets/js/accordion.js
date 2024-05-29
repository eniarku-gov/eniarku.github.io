document.addEventListener('DOMContentLoaded', function () {
    const accordionButtons = document.querySelectorAll('.accordion-button');
  
    accordionButtons.forEach(button => {
      button.addEventListener('click', function () {
        const accordionCollapse = this.nextElementSibling;
  
        // Collapse all other sections
        document.querySelectorAll('.accordion-collapse').forEach(collapse => {
          if (collapse !== accordionCollapse) {
            collapse.classList.remove('show');
          }
        });
  
        // Toggle the clicked section
        accordionCollapse.classList.toggle('show');
      });
    });
  });
  