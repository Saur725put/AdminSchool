import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { faBook, faSearch, faBookOpen, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TagInputModule } from 'ngx-chips';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface ClassItem {
  item_id: number;
  item_text: string;
}
interface SubjectItem {
  item_id: number;
  item_text: string;
}
interface ChapterItem {
  item_id: number;
  item_text: string;
  topics: string[];
}
interface TopicItem {
  item_id: number;
  item_text: string;
}
@Component({
  selector: 'app-subjects',
  imports: [NgMultiSelectDropDownModule, FormsModule, FontAwesomeModule, TagInputModule, CommonModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent implements OnInit {
  faSearch = faSearch;
  faBook = faBook;
  faBookOpen = faBookOpen;
  faTrash = faTrash;
  faEdit = faEdit;

  classList: ClassItem[] = [];
  classSelectedItems: ClassItem[] = [];

  subjectList: SubjectItem[] = [];
  subjectSelectedItems: SubjectItem[] = [];

  chapterList: ChapterItem[] = [];
  chapterSelectedItems: ChapterItem[] = [];

  topicList: TopicItem[] = [];
  topicSelectedItems: TopicItem[] = [];

  dropdownSettings: any = {};
  items: string[] = [];
  subjectCount: number = 0;
  allSubjects: any[] = [];
  allChapters: any[] = [];

  searchTerm: string = '';
  filteredSubjects: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.fetchData();
    this.filteredSubjects = this.allSubjects;
  }

  onItemSelect(item: any) {
    this.updateTopicList();
  }
  onSelectAll(items: any) {
    this.updateTopicList();
  }
  onItemDeSelect(item: any) {
    this.updateTopicList();
  }
  onDeSelectAll(items: any) {
    this.updateTopicList();
  }

  fetchData() {
    this.http.get('http://localhost:3000/DAVBHAGALPUR1').subscribe((res: any) => {
      this.classList = res.class.map((classItem: any, index: number) => ({
        item_id: index + 1,
        item_text: `${classItem.class_Name} ${classItem.section}`,
      }));
      this.subjectList = res.subject.map((subject: any, index: number) => ({
        item_id: index + 1,
        item_text: subject.subject_Name,
      }));
      this.chapterList = res.chapter.map((chapter: any, index: number) => ({
        item_id: index + 1,
        item_text: chapter.chapter_name,
        topics: chapter.topic,
      }));
      this.allChapters = res.chapter;
      this.subjectCount = res.subject.length;
      // this.allSubjects = res.subject; // Correctly assign the subject data
      this.allSubjects = res.subject.map((subject: any) => {
        const subjectChapters = res.chapter.filter((chapter: any) => chapter.subject_id === subject.id);
        const totalTopics = subjectChapters.reduce((total: number, chapter: any) => total + chapter.topic.length, 0);

        return {
            ...subject,
            chapterCount: subjectChapters.length,
            topicCount: totalTopics,
        };
    });
      this.filteredSubjects = this.allSubjects;
    });
  }

  updateTopicList() {
    const selectedChapters: string[] = this.chapterSelectedItems.map(item => item.item_text);
    let topics: TopicItem[] = [];
    let topicIdCounter = 1;

    selectedChapters.forEach(chapterName => {
      const chapter = this.chapterList.find(ch => ch.item_text === chapterName);
      if (chapter) {
        chapter.topics.forEach(topic => {
          if (!topics.some(t => t.item_text === topic)) {
            topics.push({
              item_id: topicIdCounter++,
              item_text: topic,
            });
          }
        });
      }
    });
    this.topicSelectedItems = this.topicSelectedItems.filter(topic =>
      topics.some(t => t.item_text === topic.item_text)
    );
    this.topicList = topics;
  }

  searchSubjects() {
    if (this.searchTerm) {
      this.filteredSubjects = this.allSubjects.filter(subject =>
        subject.subject_Name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredSubjects = this.allSubjects;
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredSubjects = this.allSubjects;
  }
}