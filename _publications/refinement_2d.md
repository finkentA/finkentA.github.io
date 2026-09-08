---
title: "Mesh Refinement to Preserve Critical Points in Discrete Vector Fields"
collection: publications
category: manuscripts
permalink: /publication/refinement_2d
excerpt: 'This paper is about preserving the discrete critical points by refining a PL vector field so that every edge has a single direction of flow.'
date: 2026-06-14
venue: 'Journal of Applied and Computational Topology'
# slidesurl: 'http://finkenta.github.io/files/protestware_slides.pdf'
# paperurl: 'http://finkenta.github.io/files/INR_paper.pdf'
# bibtexurl: 'http://finkenta.github.io/files/protestware_bibtex.bib'
citation: '<b> (Under Review) </b> Finken, Tanner et al. (2026). &quot;Mesh Refinement to Preserve Critical Points in Discrete Vector Fields.&quot; <i>Journal of Applied and Computational Topology</i>.'
---

Abstract: Existing discrete vector field construction algorithms may produce a discrete topology that disagrees with the topology of the underlying piecewise linear (PL) vector field. We introduce a refinement algorithm for 2D PL vector fields that modifies the underlying triangulation so that locally constructed discrete vector fields are topologically consistent with the underlying PL field. The key condition enforced by our refinement is that every mesh edge has a single flow direction. Under this condition, the local evaluation used for discrete pairing accurately represents the PL flow, ensuring that the number and location of non-boundary discrete critical points reflect those in the PL field. We prove that any PL flow on a triangle admits a refinement with single-direction flow on every edge using only a bounded number of additional triangles. We further provide a targeted refinement strategy around vertices inserted at critical points to guarantee discrete type classification. After refinement, constructing the discrete field with the Outward Stars Algorithm (OSA) produces a discrete topology whose non-boundary critical points are representative of the PL topology. Moreover, each of the six PL vector field critical point types will produce an appropriate discrete critical point type (of which there are three) based on the discrete concepts of attraction and repulsion. In experiments on real datasets, the refinement increased the number of triangles by only 4 to 17\% and required just seconds of processing time for millions of triangles.
