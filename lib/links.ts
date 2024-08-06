export class ControlPanelLinks {
  static home: string = "/control-panel";

  static posts: string = ControlPanelLinks.home + "/posts"; // /control-panel/posts
  static createPost: string = ControlPanelLinks.posts + "/create"; // /control-panel/posts/create
  static updatePost: string = ControlPanelLinks.posts + "/update"; // /control-panel/posts/update

  static categories: string = ControlPanelLinks.home + "/categories";
  static createCategory: string = ControlPanelLinks.categories + "/create";
  static updateCategory: string = ControlPanelLinks.categories + "/update";

  static media: string = ControlPanelLinks.home + "/media";

}
