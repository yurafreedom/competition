$(document).ready(function() {
    var e = $('.demoContestant');
	var n = $('.demoContestant .project-number');
	n.text(1);
	//i<102 - это количество проектов в конкурсе
    for (var i = 1; i < 102; i++) {
      e.clone().insertBefore(e);
	  n.text(i+1);		  
    }
});

//pagination
function getPageList(totalPages, page, maxLength) {
  if (maxLength < 5) throw "maxLength must be at least 5";

  function range(start, end) {
    return Array.from(Array(end - start + 1), (_, i) => i + start);
  }

  var sideWidth = maxLength < 9 ? 1 : 2;
  var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
  var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
  if (totalPages <= maxLength) {
    // no breaks in list
    return range(1, totalPages);
  }
  if (page <= maxLength - sideWidth - 1 - rightWidth) {
    // no break on left of page
    return range(1, maxLength - sideWidth - 1)
      .concat([0])
      .concat(range(totalPages - sideWidth + 1, totalPages));
  }
  if (page >= totalPages - sideWidth - 1 - rightWidth) {
    // no break on right of page
    return range(1, sideWidth)
      .concat([0])
      .concat(
        range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
      );
  }
  // Breaks on both sides
  return range(1, sideWidth)
    .concat([0])
    .concat(range(page - leftWidth, page + rightWidth))
    .concat([0])
    .concat(range(totalPages - sideWidth + 1, totalPages));
}

$(function() {
  // Number of items and limits the number of items per page
  var numberOfItems = $("#contestantList .demoContestant").length;
  var limitPerPage = 7;
  // Total pages rounded upwards
  var totalPages = Math.ceil(numberOfItems / limitPerPage);
  // Number of buttons at the top, not counting prev/next,
  // but including the dotted buttons.
  // Must be at least 5:
	if (window.matchMedia('(min-width: 768px)').matches)
	{
		var paginationSize = 15;
	}
	else {
		var paginationSize = 5;
	}
				
  var currentPage;
  
  

  function showPage(whichPage) {
    if (whichPage < 1 || whichPage > totalPages) return false;
    currentPage = whichPage;
    $(".demoContestant")
      .hide()
      .slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage)
      .show();
    // Replace the navigation items (not prev/next):
    $(".pagination li").slice(1, -1).remove();
    getPageList(totalPages, currentPage, paginationSize).forEach(item => {
      $("<li>")
        .addClass(
          "page-item " +
            (item ? "current-page " : "") +
            (item === currentPage ? "active " : "")
        )
        .append(
          $("<a>")
            .addClass("page-link")
            .attr({
              href: "javascript:void(0)"
            })
            .text(item || "...")
        )
        .insertBefore("#next-page");
    });
	if (currentPage == totalPages){
		$('#next-page').addClass('active');
	}
	else {
		$('#next-page').removeClass('active');
	};
	if (currentPage == 1){
		$('#previous-page').addClass('active');
	}
	else {
		$('#previous-page').removeClass('active');
	};
    return true;
  }

  // Include the prev/next buttons:
  if (window.matchMedia('(min-width: 992px)').matches) {
	  var prev = "Предыдущая";
	  var next = "Следующая";
  }
  else {
	  var prev = "<";
	  var next = ">";	  
  }
  
  $(".pagination").append(
    $("<li>").addClass("page-item").attr({ id: "previous-page" }).append(
      $("<a>")
        .addClass("page-link")
        .attr({
          href: "javascript:void(0)"
        })
        .text(prev)
    ),
    $("<li>").addClass("page-item").attr({ id: "next-page" }).append(
      $("<a>")
        .addClass("page-link")
        .attr({
          href: "javascript:void(0)"
        })
        .text(next)
    )
  );	

  // Show the page links
  $("#contestantList").show();
  showPage(1);

  // Use event delegation, as these items are recreated later
  $(
    document
  ).on("click", ".pagination li.current-page:not(.active)", function() {
    return showPage(+$(this).text());
  });
  $("#next-page").on("click", function() {
    return showPage(currentPage + 1);
  });

  $("#previous-page").on("click", function() {
    return showPage(currentPage - 1);
  });
  $(".pagination").on("click", function() {
    $("html,body").animate({ scrollTop: 0 }, 0);
  });
});
