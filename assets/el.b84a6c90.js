import{s1 as u,s2 as l}from"./vendor.70daa49e.js";import{a as c}from"./moment.3f4b6220.js";function m(s,_){return _.forEach(function(t){t&&typeof t!="string"&&!Array.isArray(t)&&Object.keys(t).forEach(function(n){if(n!=="default"&&!(n in s)){var o=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(s,n,o.get?o:{enumerable:!0,get:function(){return t[n]}})}})}),Object.freeze(s)}var a={exports:{}};(function(s,_){(function(t,n){n(typeof u=="function"?c.exports:t.moment)})(l,function(t){//! moment.js locale configuration
function n(e){return typeof Function!="undefined"&&e instanceof Function||Object.prototype.toString.call(e)==="[object Function]"}var o=t.defineLocale("el",{monthsNominativeEl:"\u0399\u03B1\u03BD\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2_\u03A6\u03B5\u03B2\u03C1\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2_\u039C\u03AC\u03C1\u03C4\u03B9\u03BF\u03C2_\u0391\u03C0\u03C1\u03AF\u03BB\u03B9\u03BF\u03C2_\u039C\u03AC\u03B9\u03BF\u03C2_\u0399\u03BF\u03CD\u03BD\u03B9\u03BF\u03C2_\u0399\u03BF\u03CD\u03BB\u03B9\u03BF\u03C2_\u0391\u03CD\u03B3\u03BF\u03C5\u03C3\u03C4\u03BF\u03C2_\u03A3\u03B5\u03C0\u03C4\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2_\u039F\u03BA\u03C4\u03CE\u03B2\u03C1\u03B9\u03BF\u03C2_\u039D\u03BF\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2_\u0394\u03B5\u03BA\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2".split("_"),monthsGenitiveEl:"\u0399\u03B1\u03BD\u03BF\u03C5\u03B1\u03C1\u03AF\u03BF\u03C5_\u03A6\u03B5\u03B2\u03C1\u03BF\u03C5\u03B1\u03C1\u03AF\u03BF\u03C5_\u039C\u03B1\u03C1\u03C4\u03AF\u03BF\u03C5_\u0391\u03C0\u03C1\u03B9\u03BB\u03AF\u03BF\u03C5_\u039C\u03B1\u0390\u03BF\u03C5_\u0399\u03BF\u03C5\u03BD\u03AF\u03BF\u03C5_\u0399\u03BF\u03C5\u03BB\u03AF\u03BF\u03C5_\u0391\u03C5\u03B3\u03BF\u03CD\u03C3\u03C4\u03BF\u03C5_\u03A3\u03B5\u03C0\u03C4\u03B5\u03BC\u03B2\u03C1\u03AF\u03BF\u03C5_\u039F\u03BA\u03C4\u03C9\u03B2\u03C1\u03AF\u03BF\u03C5_\u039D\u03BF\u03B5\u03BC\u03B2\u03C1\u03AF\u03BF\u03C5_\u0394\u03B5\u03BA\u03B5\u03BC\u03B2\u03C1\u03AF\u03BF\u03C5".split("_"),months:function(e,r){return e?typeof r=="string"&&/D/.test(r.substring(0,r.indexOf("MMMM")))?this._monthsGenitiveEl[e.month()]:this._monthsNominativeEl[e.month()]:this._monthsNominativeEl},monthsShort:"\u0399\u03B1\u03BD_\u03A6\u03B5\u03B2_\u039C\u03B1\u03C1_\u0391\u03C0\u03C1_\u039C\u03B1\u03CA_\u0399\u03BF\u03C5\u03BD_\u0399\u03BF\u03C5\u03BB_\u0391\u03C5\u03B3_\u03A3\u03B5\u03C0_\u039F\u03BA\u03C4_\u039D\u03BF\u03B5_\u0394\u03B5\u03BA".split("_"),weekdays:"\u039A\u03C5\u03C1\u03B9\u03B1\u03BA\u03AE_\u0394\u03B5\u03C5\u03C4\u03AD\u03C1\u03B1_\u03A4\u03C1\u03AF\u03C4\u03B7_\u03A4\u03B5\u03C4\u03AC\u03C1\u03C4\u03B7_\u03A0\u03AD\u03BC\u03C0\u03C4\u03B7_\u03A0\u03B1\u03C1\u03B1\u03C3\u03BA\u03B5\u03C5\u03AE_\u03A3\u03AC\u03B2\u03B2\u03B1\u03C4\u03BF".split("_"),weekdaysShort:"\u039A\u03C5\u03C1_\u0394\u03B5\u03C5_\u03A4\u03C1\u03B9_\u03A4\u03B5\u03C4_\u03A0\u03B5\u03BC_\u03A0\u03B1\u03C1_\u03A3\u03B1\u03B2".split("_"),weekdaysMin:"\u039A\u03C5_\u0394\u03B5_\u03A4\u03C1_\u03A4\u03B5_\u03A0\u03B5_\u03A0\u03B1_\u03A3\u03B1".split("_"),meridiem:function(e,r,i){return e>11?i?"\u03BC\u03BC":"\u039C\u039C":i?"\u03C0\u03BC":"\u03A0\u039C"},isPM:function(e){return(e+"").toLowerCase()[0]==="\u03BC"},meridiemParse:/[ΠΜ]\.?Μ?\.?/i,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendarEl:{sameDay:"[\u03A3\u03AE\u03BC\u03B5\u03C1\u03B1 {}] LT",nextDay:"[\u0391\u03CD\u03C1\u03B9\u03BF {}] LT",nextWeek:"dddd [{}] LT",lastDay:"[\u03A7\u03B8\u03B5\u03C2 {}] LT",lastWeek:function(){switch(this.day()){case 6:return"[\u03C4\u03BF \u03C0\u03C1\u03BF\u03B7\u03B3\u03BF\u03CD\u03BC\u03B5\u03BD\u03BF] dddd [{}] LT";default:return"[\u03C4\u03B7\u03BD \u03C0\u03C1\u03BF\u03B7\u03B3\u03BF\u03CD\u03BC\u03B5\u03BD\u03B7] dddd [{}] LT"}},sameElse:"L"},calendar:function(e,r){var i=this._calendarEl[e],d=r&&r.hours();return n(i)&&(i=i.apply(r)),i.replace("{}",d%12==1?"\u03C3\u03C4\u03B7":"\u03C3\u03C4\u03B9\u03C2")},relativeTime:{future:"\u03C3\u03B5 %s",past:"%s \u03C0\u03C1\u03B9\u03BD",s:"\u03BB\u03AF\u03B3\u03B1 \u03B4\u03B5\u03C5\u03C4\u03B5\u03C1\u03CC\u03BB\u03B5\u03C0\u03C4\u03B1",ss:"%d \u03B4\u03B5\u03C5\u03C4\u03B5\u03C1\u03CC\u03BB\u03B5\u03C0\u03C4\u03B1",m:"\u03AD\u03BD\u03B1 \u03BB\u03B5\u03C0\u03C4\u03CC",mm:"%d \u03BB\u03B5\u03C0\u03C4\u03AC",h:"\u03BC\u03AF\u03B1 \u03CE\u03C1\u03B1",hh:"%d \u03CE\u03C1\u03B5\u03C2",d:"\u03BC\u03AF\u03B1 \u03BC\u03AD\u03C1\u03B1",dd:"%d \u03BC\u03AD\u03C1\u03B5\u03C2",M:"\u03AD\u03BD\u03B1\u03C2 \u03BC\u03AE\u03BD\u03B1\u03C2",MM:"%d \u03BC\u03AE\u03BD\u03B5\u03C2",y:"\u03AD\u03BD\u03B1\u03C2 \u03C7\u03C1\u03CC\u03BD\u03BF\u03C2",yy:"%d \u03C7\u03C1\u03CC\u03BD\u03B9\u03B1"},dayOfMonthOrdinalParse:/\d{1,2}η/,ordinal:"%d\u03B7",week:{dow:1,doy:4}});return o})})();var f=a.exports,M=Object.freeze(m({__proto__:null,[Symbol.toStringTag]:"Module",default:f},[a.exports]));export{M as e};