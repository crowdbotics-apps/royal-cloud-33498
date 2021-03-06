import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { COLORS, FONT1BOLD, FONT1REGULAR, FONT1SEMIBOLD } from '../../constants'
import { Header } from '../../components'

function TermsCondition ({ navigation }) {
  return (
    <View style={styles.container}>
      <Header logo back rightEmpty />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tab}>
          <Text style={styles.activeTabText}>Privacy Policy</Text>
          <View style={styles.activeline} />
        </View>
        <Text style={styles.headingText}>Terms & Conditions</Text>
        <Text style={styles.paragragh}>
          CROWDBOTICS CORPORATION SOFTWARE AND SERVICES TERMS OF USE BY
          ACCEPTING THESE TERMS, BY (1) CLICKING A BOX OR BUTTON INDICATING
          ACCEPTANCE, (2) EXECUTING AN ORDER FORM THAT REFERENCES THESE TERMS,
          OR (3) USING A FREE PRODUCT, YOU AGREE TO THESE TERMS. IF YOU REGISTER
          FOR CROWDBOTICS’ FREE PRODUCT, THE APPLICABLE PROVISIONS OF THESE
          TERMS WILL ALSO GOVERN THAT FREE PRODUCT. IF THE INDIVIDUAL ACCEPTING
          THESE TERMS IS ACCEPTING ON BEHALF OF A COMPANY OR OTHER LEGAL ENTITY,
          SUCH INDIVIDUAL REPRESENTS THAT THEY HAVE THE AUTHORITY TO BIND SUCH
          ENTITY AND ITS AFFILIATES TO THESE TERMS, IN WHICH CASE THE TERM “YOU”
          REFERS TO SUCH ENTITY AND ITS AFFILIATES. IF THE INDIVIDUAL ACCEPTING
          THESE TERMS DOES NOT HAVE SUCH AUTHORITY, OR DOES NOT AGREE WITH THESE
          TERMS, SUCH INDIVIDUAL MUST NOT ACCEPT THESE TERMS AND MAY NOT USE THE
          PLATFORM. ‍ 1. Platform. Subject to the terms and conditions of these
          Terms, Crowdbotics grants you during the Term (defined below) a
          limited, non-exclusive, non-transferable, non-sublicenseable right to
          access and use the Crowdbotics website, software development platform,
          engineering workforce and module library (collectively, the
          “Platform”) for the purpose of managing, hosting, developing,
          launching, and analyzing your proprietary software applications
          (“Apps”). ‍ 2. Professional Services. Subject to the terms and
          conditions of these Terms, Crowdbotics will perform the professional
          engineering, design, or product management services set forth on an
          Order Form or as otherwise requested through the Platform, which may
          include managed use of the Platform by Crowdbotics on your behalf
          (“Services”). The manner and means by which Crowdbotics chooses to
          complete the Services are in Crowdbotics’ sole discretion and control.
          Crowdbotics’ obligations to provide the Services are conditioned upon
          receiving such information and cooperation from you as may be
          reasonably necessary to perform the Services. 3. Restrictions. ‍The
          rights granted to you in these Terms are subject to the following
          restrictions: (a) you may not license, sell, rent, lease, transfer,
          assign, distribute, host, or otherwise commercially exploit the
          Platform, whether in whole or in part, or any content displayed on the
          Platform; (b) you may not modify, make derivative works of,
          disassemble, reverse compile or reverse engineer any part of the
          Platform; and (c) except as expressly stated herein, no part of the
          Platform may be copied, reproduced, distributed, republished,
          downloaded, displayed, posted or transmitted in any form or by any
          means. Unless otherwise indicated, any future release, update, or
          other addition to functionality of the Platform is subject to these
          Terms. Unless otherwise specified on the Platform, all copyright and
          other proprietary notices on the Platform (or on any content displayed
          on the Platform) must be retained on all copies thereof. ‍ 4. Your
          Responsibilities. You will (a) be responsible for your authorized
          users’ (“Users”) compliance with these Terms and Order Forms, (b) be
          responsible for the accuracy, quality and legality of User Content
          (defined below), (c) be responsible for your use of your Apps
          (including any Invention and any Prior Invention or Reusable Module
          (each defined below) incorporated into an Invention) and the
          interoperation of your App with any third party application, (d) use
          commercially reasonable efforts to prevent unauthorized access to or
          use of Platform, and notify Crowdbotics promptly of any such
          unauthorized access or use, and (e) use the Platform and Services only
          in accordance with these Terms and applicable laws and government
          regulations. Any use of the Platform in breach of the foregoing by you
          or Users that in Crowdbotics’ judgment threatens the security,
          integrity or availability of Crowdbotics’ services, may result in
          Crowdbotics’ immediate suspension of the Platform, however Crowdbotics
          will use commercially reasonable efforts under the circumstances to
          provide you with notice and an opportunity to remedy such violation or
          threat prior to any such suspension. ‍ 5. Accounts. a. Registration.
          In order to use certain features of the Platform, you must register
          for an account (“Account”) and provide certain information about
          yourself as prompted by the account registration form. You represent
          and warrant that: (i) all required registration information you submit
          is truthful and accurate; (ii) you will maintain the accuracy of such
          information. You may delete your Account at any time, for any reason,
          by following the instructions on the Platform. Crowdbotics may suspend
          or terminate your Account in accordance with Section 9. ‍ b.
          Responsibilities. You are responsible for maintaining the
          confidentiality of your Account login information and are fully
          responsible for all activities that occur under your Account. You
          agree to immediately notify Crowdbotics of any unauthorized use, or
          suspected unauthorized use of your Account or any other breach of
          security. Crowdbotics cannot and will not be liable for any loss or
          damage arising from your failure to comply with the above
          requirements. ‍ 6. User Content. a. “User Content” means any and all
          information and content that you submit to the Platform (e.g.,
          Materials (defined below) that you submit to the Platform). You are
          solely responsible for your User Content. You assume all risks
          associated with use of your User Content, including any reliance on
          its accuracy, completeness or usefulness by others, or any disclosure
          of your User Content that personally identifies you or any third
          party. You represent and warrant that your User Content does not
          violate Crowdbotics’ Acceptable Use Policy (set forth below). You may
          not represent or imply to others that your User Content is in any way
          provided, sponsored or endorsed by Crowdbotics. Because you alone are
          responsible for your User Content, you may expose yourself to
          liability if, for example, your User Content violates the Acceptable
          Use Policy. ‍ 7. Ownership. a. Platform. Crowdbotics retains all
          rights in the Platform, except as expressly set forth in these Terms.
          ‍ b. Apps. You own your Apps, subject to the terms and conditions of
          these Terms. ‍ c. Inventions. All rights in and to any copyrightable
          software, algorithm, code, material, notes, records, drawings,
          designs, inventions, improvements, developments, discoveries and trade
          secrets (“Materials”) conceived, discovered, authored, invented,
          developed or reduced to practice by Crowdbotics, solely or in
          collaboration with others, during the Term and arising out of, or in
          connection with, performing the Services under these Terms and any
          copyrights, patents, trade secrets, mask work rights or other
          intellectual property rights relating to the foregoing (collectively,
          but excluding Prior Inventions and Reusable Modules “Inventions”), are
          your sole property. Crowdbotics will promptly disclose any Invention
          to you in writing and will deliver and assign (or cause to be
          assigned) and hereby assigns fully to you all right, title and
          interest in and to the Inventions. Crowdbotics will reasonably assist
          you to further evidence, record and perfect such assignments, and to
          perfect, obtain, maintain, enforce and defend any rights assigned.
          Notwithstanding the foregoing, Crowdbotics reserves the right to use
          and re-use any generalized knowledge it gains arising from the
          performance of Services in its business without liability to you. ‍ d.
          Prior Inventions. If, in the course of performing Services,
          Crowdbotics incorporates into any Invention or uses any pre-existing
          Materials owned by Crowdbotics or in which Crowdbotics has an interest
          (“Prior Inventions”), then Crowdbotics grants you a non-exclusive,
          royalty-free, perpetual, irrevocable, transferable, worldwide,
          sublicenseable license to make, have made, use, import, offer for
          sale, sell, reproduce, distribute, modify, adapt, prepare derivative
          works of, display, perform, and otherwise exploit such Prior
          Inventions solely as incorporated into Inventions. ‍ e. Reusable
          Modules. Any open-source components Crowdbotics uses in performing the
          Services, whether pre-existing or created by Crowdbotics (“Reusable
          Modules”) are licensed to you pursuant to the terms of the applicable
          open source license. For clarity, and notwithstanding anything to the
          contrary in these Terms, Crowdbotics may develop new Reusable Modules
          based on your requests in connection with the Services. Crowdbotics
          will not incorporate any of your User Content into a Reusable Module
          without your prior consent. 8. Relationship of Parties. Crowdbotics
          and you are independent contractors. You understand that Crowdbotics
          is not an employee, and that the performance of Services requires a
          collaborative, professional relationship of equals where mutual
          professional respect, courtesy and consideration are expected. Due to
          the virtual nature of the relationship, you understand the importance
          of communication, and agree to respond to questions, requests and
          communications from Crowdbotics in a timely manner. You understand
          that Crowdbotics is a business with other clients, and requires fair,
          realistic notice in order to attend to requests and projects. You
          understand that Crowdbotics may require detailed clarification of
          tasks in order to meet expectations and provide the best support and
          highest quality work, and agrees to provide specifications at the
          level of detail required by Crowdbotics. ‍ 9. Term; Termination. a.
          The term of these Terms begins on the date you accept these Terms and
          continues until all subscriptions have expired or been terminated,
          unless otherwise set forth on an Order Form (the “Term”). Unless
          otherwise specified on an Order Form, subscriptions will automatically
          renew for additional periods equal to the expiring subscription term,
          unless either party gives the other notice of non-renewal at least 30
          days before the end of the relevant subscription term, by cancelling
          the user’s subscription via the Crowdbotics web product. ‍ b. Effect
          of Termination. Upon termination of these Terms, your right to use the
          Platform will immediately cease and any fees you owe to Crowdbotics
          will become immediately due. Sections 3, 4, 7, 8b, 10 – 14, 15.b, and
          16 – 23 will survive any termination or expiration of these Terms.
          Crowdbotics may delete any User Content hosted on the Platform. 10.
          Scope Upon request and execution of an Order Form, Crowdbotics shall
          provide the Professional Services to Customer. The scope of
          Professional Services shall be limited to those outlined in the PRD
          and as reflected in any Statement of Work. ‍ 11. Change Orders‍ Any
          changes, modifications or additions to the Professional Services,
          including scope, Fees and/or Expenses shall only be valid if agreed to
          in by both Parties in a signed agreement or on the Platform (a “Change
          Order”). A validly executed Change Order shall modify the Order Form,
          Professional Services and the Fees, and shall be binding on the
          parties. ‍ 12. Acceptance Criteria‍ Upon completion of each
          Deliverable or the conclusion of a milestone, Crowdbotics will: (i)
          submit a complete copy of the Deliverable to Customer via the
          Crowdbotics Platform; and (ii) demonstrate and test its functionality
          in accordance with test specifications (if any) set forth in the
          applicable Order Form. A Customer shall provide Notice of any defect
          or problem relating to the Deliverable not later than two (2) business
          days after the date of delivery stating any objection to the
          Deliverable in sufficient detail to clearly explain the nature of the
          problem alleged. Absent such Notice, the Company shall have no
          obligation to make further changes to the Deliverable and the Order
          Form shall be deemed fulfilled. 13. Service Providers‍ If Customer is
          dissatisfied with or objects to a particular Crowdbotics Service
          Provider at any time during the term of this Agreement and provides
          Notice of such dissatisfaction or objections with sufficient detail to
          clearly explain the nature of the problem alleged, Crowdbotics will
          use its reasonable efforts to assign another Service Provider to
          Customer’s account. ‍ 14. Timelines‍ Crowdbotics will make
          commercially reasonable efforts to achieve timelines explicitly
          written into a Statement of Work executed by both parties. From time
          to time, Service Providers or Crowdbotics may make additional informal
          estimations for specific activities. However, only timelines
          explicitly written into a Statement of Work may be relied upon.
          Crowdbotics and Customer agree not to rely on informal estimations
          made outside the context of an official Statement of Work. ‍15. Fees.
          The fees for the Platform and any Services are as set forth on the
          Order Form, or, if you do not have an Order Form, the Platform. You
          will provide Crowdbotics with valid and updated credit card
          information, and you authorize Crowdbotics to charge such credit card
          for the fees for the initial subscription term, hourly or
          milestone-based service fees, any renewal subscription term, in
          advance, in accordance with the billing frequency set forth on the
          Order Form, or if there is no Order Form, the Platform. Subscriptions,
          hourly fees, and milestone-based fees are non-refundable once hours
          are worked and charged (for hourly fees) or when milestones are funded
          for work (for milestone fees). ‍ 16. No Support or Maintenance. Unless
          you have a subscription that provides for support, you acknowledge and
          agree that Crowdbotics will have no obligation to provide you with any
          support or maintenance in connection with the Platform except as part
          of the Services. ‍ 17. Acceptable Use Policy. The following terms
          constitute Crowdbotics’ “Acceptable Use Policy”: a. You will not use
          the Platform to collect, upload, transmit, display, or distribute any
          User Content (i) that violates any third-party right, including any
          copyright, trademark, patent, trade secret, moral right, privacy
          right, right of publicity, or any other intellectual property or
          proprietary right; (ii) that is unlawful, harassing, abusive,
          tortious, threatening, harmful, invasive of another’s privacy, vulgar,
          defamatory, false, intentionally misleading, trade libelous,
          pornographic, obscene, patently offensive, promotes racism, bigotry,
          hatred, or physical harm of any kind against any group or individual
          or is otherwise objectionable; (iii) that is harmful to minors in any
          way; or (iv) that is in violation of any law, regulation, or
          obligations or restrictions imposed by any third party. ‍ b. In
          addition, you will not: (i) upload, transmit, or distribute to or
          through the Platform any computer viruses, worms, or any software
          intended to damage or alter a computer system or data; (ii) send
          through the Platform unsolicited or unauthorized advertising,
          promotional materials, junk mail, spam, chain letters, pyramid
          schemes, or any other form of duplicative or unsolicited messages,
          whether commercial or otherwise; (iii) use the Platform to harvest,
          collect, gather or assemble information or data regarding other users,
          including e-mail addresses, without their consent; (iv) interfere
          with, disrupt, or create an undue burden on servers or networks
          connected to the Platform, or violate the regulations, policies or
          procedures of such networks; (v) attempt to gain unauthorized access
          to the Platform (or to other computer systems or networks connected to
          or used together with the Platform), whether through password mining
          or any other means; (vi) harass or interfere with any other user’s use
          and enjoyment of the Platform; or (vi) use software or automated
          agents or scripts to produce multiple accounts on the Platform, or to
          generate automated searches, requests, or queries to (or to strip,
          scrape, or mine data from) the Platform (provided, however, that we
          conditionally grant to the operators of public search engines
          revocable permission to use spiders to copy materials from the
          Platform for the sole purpose of and solely to the extent necessary
          for creating publicly available searchable indices of the materials,
          but not caches or archives of such materials, subject to the
          parameters set forth in our robots.txt file). ‍c. Enforcement. We
          reserve the right (but have no obligation) to review any User Content,
          and to investigate and/or take appropriate action against you in our
          sole discretion if you violate this Acceptable Use Policy or any other
          provision of these Terms or otherwise create liability for us or any
          other person. Such action may include removing or modifying your User
          Content, terminating your Account in accordance with Section 9, and/or
          reporting you to law enforcement authorities. ‍18. Feedback; Name. ‍
          If you provide Crowdbotics with any feedback or suggestions regarding
          the Platform or Services (“Feedback”), then you grant Crowdbotics a
          perpetual, irrevocable, non-exclusive, transferable, sublicensable,
          worldwide license to use such Feedback in any manner it deems
          appropriate. Crowdbotics will treat any Feedback as non-confidential
          and non-proprietary. Unless you provide Crowdbotics with an opt-out
          notice, you grant Crowdbotics a right to use your name, logo, and
          application screenshots in Crowdbotics’ marketing materials. Any such
          opt-out notice will not apply to use by Crowdbotics in accordance with
          this Section prior to Crowdbotics’ receipt of notice. ‍19.
          Representations and Warranties. You represent and warrant that you
          have the full right and authority to enter into and perform these
          Terms, and that entering into these Terms does not violate any
          outstanding assignments, grants, licenses, encumbrances, obligations,
          agreements or understanding to which you are a party. Crowdbotics
          warrants that during an applicable subscription term Crowdbotics will
          not materially decrease the overall functionality of the Platform. For
          any breach of that warranty, your exclusive remedies are those
          described in Section 9. ‍ 20. Free Services. a. Crowdbotics may make
          certain parts of the Platform available for free (“Free Products”).
          Use of Free Products is subject to the terms and conditions of these
          Terms. In the event of a conflict between this section and any other
          portion of these Terms, this section controls. Free Products are
          provided to you without charge as described on the Platform. You agree
          that Crowdbotics, in its sole discretion and for any or no reason, may
          terminate your access to the Free Products or any part thereof, with
          or without prior notice. Crowdbotics will not be liable to you or any
          third party for such termination. You are solely responsible for
          exporting your User Content and any Apps from the Free Products prior
          to termination of your access to the Free Products for any reason,
          provided that if Crowdbotics terminates your account, except as
          required by law, Crowdbotics will provide you a reasonable opportunity
          to retrieve your Apps. ‍ b. NOTWITHSTANDING SECTIONS 14, 16, AND 18.b,
          THE FREE PRODUCTS ARE PROVIDED “AS-IS” AND WITHOUT ANY WARRANTY, AND
          CROWDBOTICS HAS NO INDEMNIFICATION OBLIGATIONS NOR LIABILITY OF ANY
          TYPE WITH RESPECT TO THE FREE PRODUCTS UNLESS SUCH EXCLUSION OF
          LIABILITY IS NOT ENFORCEABLE UNDER APPLICABLE LAW IN WHICH CASE
          CROWDBOTICS’ LIABILITY WITH RESPECT TO THE FREE PRODUCTS WILL NOT
          EXCEED US$100. WITHOUT LIMITING THE FOREGOING, CROWDBOTICS AND ITS
          SUPPLIERS DO NOT REPRESENT OR WARRANT TO YOU THAT: (I) YOUR USE OF THE
          FREE PRODUCTS WILL MEET YOUR REQUIREMENTS, (II) YOUR USE OF THE FREE
          PRODUCTS WILL BE UNINTERRUPTED, TIMELY, SECURE OR FREE FROM ERROR, AND
          (III) ANY DATA PROVIDED THROUGH THE FREE PRODUCTS WILL BE ACCURATE.
          NOTWITHSTANDING ANYTHING TO THE CONTRARY IN SECTION 17, YOU ARE FULLY
          LIABLE UNDER THESE TERMS TO CROWDBOTICS FOR ANY DAMAGES ARISING OUT OF
          YOUR USE OF THE FREE PRODUCTS, ANY BREACH BY YOU OF THESE TERMS AND
          ANY OF YOUR INDEMNIFICATION OBLIGATIONS HEREUNDER. ‍ 21. Disclaimers.
          EXCEPT AS EXPRESSLY PROVIDED IN THESE TERMS, NEITHER PARTY MAKES ANY
          WARRANTY OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY OR
          OTHERWISE, AND EACH PARTY SPECIFICALLY DISCLAIMS ALL IMPLIED
          WARRANTIES, INCLUDING ANY IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS
          FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT, TO THE FULLEST EXTENT
          PERMITTED BY APPLICABLE LAW. ‍ 22. Limitation of Liability. a. TO THE
          FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL CROWDBOTICS (OR ITS
          SUPPLIERS) BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY LOST PROFITS,
          LOST DATA, COSTS OF PROCUREMENT OF SUBSTITUTE PRODUCTS, OR ANY
          INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE
          DAMAGES ARISING FROM OR RELATING TO THESE TERMS OR YOUR USE OF, OR
          INABILITY TO USE, THE PLATFORM OR SERVICES, EVEN IF CROWDBOTICS HAS
          BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. ACCESS TO, AND USE
          OF, THE PLATFORM AND SERVICES IS AT YOUR OWN DISCRETION AND RISK, AND
          YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR DEVICE OR
          COMPUTER SYSTEM, OR LOSS OF DATA RESULTING THEREFROM. ‍ b. TO THE
          FULLEST EXTENT PERMITTED BY LAW, NOTWITHSTANDING ANYTHING TO THE
          CONTRARY, CROWDBOTICS’ LIABILITY TO YOU FOR ANY DAMAGES ARISING FROM
          OR RELATED TO THESE TERMS (FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF
          THE FORM OF THE ACTION), WILL AT ALL TIMES BE LIMITED TO THE GREATER
          OF (I) THE FEES YOU HAVE PAID CROWDBOTICS IN THE 12 MONTHS PRIOR TO
          THE EVENT GIVING RISE TO LIABILITY AND (II) US$50. THE EXISTENCE OF
          MORE THAN ONE CLAIM WILL NOT ENLARGE THIS LIMIT. YOU AGREE THAT OUR
          SUPPLIERS WILL HAVE NO LIABILITY OF ANY KIND ARISING FROM OR RELATING
          TO THESE TERMS. ‍ 23. Indemnification a. By You. To The fullest extent
          permitted by law, you will indemnify Crowdbotics from and against any
          and all liabilities, suits, losses, damages and judgments, costs and
          expenses (including reasonable outside counsel's fees and expenses) in
          connection with (i) your use of the Platform or Services in a manner
          not authorized under these Terms, (ii) any other breach of these Terms
          by you, and (iii) your use of Prior Inventions or Reusable Modules in
          a manner not authorized under these Terms. ‍ b. By Crowdbotics. Unless
          you are using a Free Product, Crowdbotics will indemnify and defend
          you against any claim, demand, suit or proceeding made or brought
          against you by a third party alleging that the Platform or any Prior
          Invention infringes or misappropriates such third party’s intellectual
          property rights (an “IP Claim”), provided that you (i) promptly give
          Crowdbotics written notice of the IP Claim, (ii) give Crowdbotics sole
          control of the defense and settlement of the IP Claim, and (iii) give
          Crowdbotics all reasonable assistance, at Crowdbotics’ expense. The
          foregoing obligations do not apply if (1) the allegation does not
          state with specificity that the Platform or a Prior Invention are the
          basis of the IP Claim; (2) an IP Claim arises from the use or
          combination of the Platform or Prior Invention (other than as
          incorporated into an Invention) with software, hardware, data, or
          processes not provided by Crowdbotics, if the Platform, Prior
          Invention or use thereof would not infringe without such combination;
          (3) an IP Claim arises from Services for which there is no charge; or
          (4) an IP Claim arises from User Content or your breach of these
          Terms. If Crowdbotics believes an infringement or misappropriation
          claim related to the Platform or a Prior Invention is likely, then
          Crowdbotics may: (A) modify the Platform or Prior Invention to be
          non-infringing, (B) obtain a license for your continued use of the
          Platform or Prior Invention, or (C) terminate your subscription for
          the Platform upon 30 days’ written notice and refund you any prepaid
          fees covering the remainder of the term of the terminated
          subscriptions. ‍ 24. Confidentiality. a. Definition. “Confidential
          Information” means all information disclosed by a party (“Disclosing
          Party”) to the other party (“Receiving Party”), whether orally or in
          writing, that is designated as confidential or that reasonably should
          be understood to be confidential given the nature of the information
          and the circumstances of disclosure. Crowdbotics’ Confidential
          Information includes the Platform and any Prior Inventions, and the
          terms and conditions of all Order Forms (including pricing).
          Confidential Information of each party includes business and marketing
          plans, technology and technical information, product plans and
          designs, and business processes disclosed by such party. However,
          Confidential Information does not include any information that (i) is
          or becomes generally known to the public without breach of any
          obligation owed to the Disclosing Party, (ii) was known to the
          Receiving Party prior to its disclosure by the Disclosing Party
          without breach of any obligation owed to the Disclosing Party, (iii)
          is received from a third party without breach of any obligation owed
          to the Disclosing Party, or (iv) was independently developed by the
          Receiving Party. ‍ b. Non-Use and Non-Disclosure. As between the
          parties, each party retains all ownership rights in and to its
          Confidential Information. The Receiving Party will use the same degree
          of care that it uses to protect the confidentiality of its own
          confidential information of like kind (but not less than reasonable
          care) to (i) not use any Confidential Information of the Disclosing
          Party for any purpose outside the scope of these Terms and (ii) except
          as otherwise authorized by the Disclosing Party in writing, limit
          access to Confidential Information of the Disclosing Party to those of
          its employees and contractors who need that access for purposes
          consistent with these Terms and who have signed confidentiality
          agreements with the Receiving Party containing protections not
          materially less protective of the Confidential Information than those
          in these Terms. Neither party will disclose the terms of these Terms
          or any Order Form to any third party other than its affiliates, legal
          counsel and accountants without the other party’s prior written
          consent. ‍ c. Compelled Disclosure. The Receiving Party may disclose
          Confidential Information of the Disclosing Party to the extent
          compelled by law to do so, provided the Receiving Party gives the
          Disclosing Party prior notice of the compelled disclosure (to the
          extent legally permitted) and reasonable assistance, at the Disclosing
          Party's cost, if the Disclosing Party wishes to contest the
          disclosure. If the Receiving Party is compelled by law to disclose the
          Disclosing Party’s Confidential Information as part of a civil
          proceeding to which the Disclosing Party is a party, and the
          Disclosing Party is not contesting the disclosure, the Disclosing
          Party will reimburse the Receiving Party for its reasonable cost of
          compiling and providing secure access to that Confidential
          Information. 25. Electronic Communications. By using the Platform, you
          consent to receiving electronic communications from Crowdbotics
          (either by posting notices on the Platform or via email). You agree
          that any notices Crowdbotics is required to provide you may be
          provided electronically. ‍26. Export. The Platform and any Inventions,
          Prior Inventions and Reusable Modules may be subject to U.S. export
          control laws and may be subject to export or import regulations in
          other countries. You agree not to export, reexport, or transfer,
          directly or indirectly, any U.S. technical data acquired from
          Crowdbotics, or any products utilizing such data, in violation of the
          United States export laws or regulations. ‍ 27. Arbitration. a. We
          Both Agree To Arbitrate. You and Crowdbotics agree to resolve any
          claims relating to these Terms, the Platform or any Services through
          final and binding arbitration by a single arbitrator, except as set
          forth under Section 22.e. This includes disputes arising out of or
          relating to interpretation or application of this “Arbitration”
          section, including its enforceability, revocability, or validity. ‍ b.
          Informal Resolution. Before filing a claim, each party agrees to try
          to resolve the dispute by contacting the other party. If a dispute is
          not resolved within thirty days of notice, either party may bring a
          formal proceeding. ‍c. Arbitration. The American Arbitration
          Association (AAA) will administer the arbitration under its Commercial
          Arbitration Rules. The arbitration will be held in San Francisco (CA),
          or any other location both parties agree to in writing. ‍d. Exception
          to Arbitration. Either Party may bring a lawsuit in the federal or
          state courts of Alameda County, California solely for injunctive
          relief to stop unauthorized use or abuse of the Platform or
          infringement of intellectual property rights without first engaging in
          the informal dispute notice process described above. Both you and
          Crowdbotics consent to venue and personal jurisdiction there. ‍e. NO
          CLASS ACTIONS. You may only resolve disputes with Crowdbotics on an
          individual basis and will not bring a claim in a class, consolidated
          or representative action. Class arbitrations, class actions, private
          attorney general actions and consolidation with other arbitrations are
          not allowed. ‍28. Miscellaneous. No failure or delay by either party
          in exercising any right under these Terms will constitute a waiver of
          that right. If any term or provision of these Terms is determined to
          be illegal or invalid, such illegality or invalidity will not affect
          the validity of the remainder of these Terms. These Terms are governed
          by California law. These Terms, which include any Order Form, are the
          entire agreement between the parties hereto with respect to the
          subject matter hereof. Neither party may assign these Terms without
          the other party’s consent, except that Crowdbotics may assign these
          Terms without consent in connection with any merger where Crowdbotics
          is not the surviving entity, reorganization, or sale of all or
          substantially all of its assets. These Terms will be binding upon each
          party’s successors and permitted assigns.
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
    paddingTop: 10,
    alignItems: 'center'
  },
  header: {
    width: '90%'
  },
  scrollView: { width: '90%' },
  paragragh: {
    color: COLORS.darkBlack,
    opacity: 0.5,
    fontFamily: FONT1REGULAR,
    fontSize: hp(2.1),
    marginBottom: 20
  },
  headingText: {
    color: COLORS.black,
    width: '100%',
    fontSize: hp('3%'),
    marginTop: '5%',
    marginBottom: '5%',
    fontFamily: FONT1BOLD
  },
  activeTabText: {
    marginBottom: 10,
    color: COLORS.darkBlack,
    fontSize: hp(3),
    fontFamily: FONT1SEMIBOLD
  },
  activeline: {
    width: '100%',
    backgroundColor: COLORS.darkBlack,
    height: 5
  },
  tab: {
    width: '60%',
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center'
  }
})

export default TermsCondition
