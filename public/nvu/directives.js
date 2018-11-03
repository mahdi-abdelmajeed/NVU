function drct(drc, tmp=null, grp=null) {
  app.directive(drc, function() {
    if(tmp == null)
      tmp = drc;
    if(grp != null)
      tmp =grp +"/"+ tmp;
      return {
          templateUrl: "nvu/tmp/" + tmp + ".html",
          replace: true,
      };
  });
}

drct('app', 'index');
drct('sidenav');
drct('toolbar');
drct('footer');
