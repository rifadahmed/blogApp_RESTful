name            url         verb               desc.
-------------------------------------------------------------
index         /blogs           GET                show all blogs
new           /blogs/new       GET                show form for creating new blog
create        /blogs           POST               create new blog
show          /blogs/:id       GET                show one particular blog
edit          /blogs/:id/edit  GET                show form to edit one particular blog
update        /blogs/:id       PUT                update blog
destroy       /blogs/:id       delete             delete one particular blog