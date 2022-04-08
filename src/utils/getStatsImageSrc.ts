function getStatsImageSrc({ 
  darkMode = true, 
  showRank = true,
  hideTitle = false,
  title = "Github Stats"
}) {
  const { color, bgColor, iconColor, titleColor }: StatsImageOptions = {
    bgColor: "ffffff00",
    color: darkMode? "ffffffa3":"000000a3",
    iconColor:  darkMode? "cd6a4c":"439ab2",
    title,
    titleColor:  darkMode? "cd6a4c":"439ab2"
  };

  const url = "https://github-readme-stats.vercel.app/api?username=l-marcel&show_icons=true&layout=compact&border_color=ffffff00";
  return `${url}&text_color=${color}&title_color=${titleColor}&icon_color=${iconColor}&bg_color=${bgColor}` 
  + (title? `&custom_title=${title}`:"") + (!showRank? `&hide_rank=${!showRank}`:"") + (hideTitle? `&hide_title=${hideTitle}`:"");
};

function getTopLangsImageSrc({ 
  darkMode = true, 
  hideTitle = false,
  title = "Top Languages"
}) {
  const { color, bgColor, iconColor, titleColor }: StatsImageOptions = {
    bgColor: "ffffff00",
    color: darkMode? "ffffffa3":"000000a3",
    iconColor:  darkMode? "cd6a4c":"439ab2",
    title,
    titleColor:  darkMode? "cd6a4c":"439ab2"
  };

  const url = "https://github-readme-stats.vercel.app/api/top-langs/?username=l-marcel&show_icons=true&border_color=ffffff00";
  return `${url}&text_color=${color}&title_color=${titleColor}&icon_color=${iconColor}&bg_color=${bgColor}` 
  + (title? `&custom_title=${title}`:"") + (hideTitle? `&hide_title=${hideTitle}`:"");
};

export { getStatsImageSrc, getTopLangsImageSrc };