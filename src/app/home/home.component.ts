import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { BackendService } from "../backend.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  totalUser = 0;
  totalPage = 0;
  totalInPagination = [];
  limit = 10;
  currentPage = 1;
  users = [];
  constructor(private router: Router, private backendService: BackendService) {}
  ngOnInit() {
    $(document).ready(function() {
      $("#sidebarCollapse").on("click", function() {
        $("#sidebar").toggleClass("active");
      });
    });
    this.backendService.countAllUser().subscribe((data: any) => {
      console.log(data);
      this.totalUser = data.total_item;
      this.totalPage = Math.ceil(Number(data.total_item) / this.limit);
      this.totalInPagination = Array(
        Math.ceil(Number(data.total_item) / this.limit) > 10
          ? 10
          : Math.ceil(Number(data.total_item) / this.limit)
      );
    });
    this.listUserPagination();
  }
  listUserPagination() {
    this.backendService.getListUser(this.currentPage).subscribe((data: any) => {
      console.log(data);
      this.users = data;
    });
  }
  gotoPage($event, page) {
    $event.preventDefault();
    this.currentPage = page;
    this.listUserPagination();
  }
  nextPage($event) {
    $event.preventDefault();
    this.currentPage =
      this.currentPage + 1 > this.totalPage
        ? this.currentPage
        : this.currentPage + 1;
    this.listUserPagination();
  }
  prevPage($event) {
    $event.preventDefault();
    this.currentPage = this.currentPage - 1 < 1 ? 1 : this.currentPage - 1;
    this.listUserPagination();
  }
}
