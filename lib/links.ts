export class ControlPanelLinks {
  static home: string = "/dashboard";

  static posts: string = ControlPanelLinks.home + "/posts"; // /dashboard/posts
  static createPost: string = ControlPanelLinks.posts + "/create"; // /dashboard/posts/create
  static updatePost: string = ControlPanelLinks.posts + "/update"; // /dashboard/posts/update

  static categories: string = ControlPanelLinks.home + "/categories";
  static createCategory: string = ControlPanelLinks.categories + "/create";
  static updateCategory: string = ControlPanelLinks.categories + "/update";

  static authors: string = ControlPanelLinks.home + '/authors'

  static media: string = ControlPanelLinks.home + "/media";

}
