local vcln = elements.allocate("mymod", "VCLN")
elements.element(vcln, elements.element(elements.DEFAULT_PT_DMND))
elements.property(vcln, "Name", "VCLN")
elements.property(vcln, "Loss", 1)
elements.property(vcln, "AirLoss", 1)
elements.property(vcln, "Collision", -1)
elements.property(vcln, "Color", 0xffffffff)
elements.property(vcln, "Properties", 8519696)

local function funcUpdate(i,x,y,s,nt)
    tmpvx = tpt.get_property("vx", i)
    tmpvy = tpt.get_property("vy", i)
    rand = math.random()
    if (2*rand % 1 < 0.01) then
        if (rand < 0.5) then tmpvx = -tmpvx; tmpvy = -tmpvy; end
        tpt.set_property("vx", tmpvy, i)
        tpt.set_property("vy", -tmpvx, i)
        ctype1 = tpt.get_property("ctype", i)
        if ctype1 ~= 0 then
            ctype2 = tpt.get_property("tmp", i)
            lif = tpt.get_property("life", i)
	    j = tpt.create(((x-tmpvy-4)%604)+4, ((y+tmpvx-4)%376)+4, ctype1)
            tpt.set_property("ctype", ctype2, j)
            tpt.set_property("tmp", i, j)
            tpt.set_property("life", lif, j)
        else
            j = tpt.create(((x-tmpvy-4)%604)+4, ((y+tmpvx-4)%376)+4, vcln)
        end
        tpt.set_property("vx", -tmpvy, j)
        tpt.set_property("vy", tmpvx, j)
    end
    tmpvx2 = 0; tmpvy2 = 0; parts = 0
    for r in sim.neighbors(x,y,1,1) do
        if sim.partProperty(r, "type") == elem.DEFAULT_PT_PHOT then
            parts = parts + 1; tmpvx2 = tmpvx2 + sim.partProperty(r, "vx"); tmpvy2 = tmpvy2 + sim.partProperty(r, "vy");
        end
    end
    if (parts ~= 0) then
        tpt.set_property("vx", tmpvx + tmpvx2/parts*0.2, i)
        tpt.set_property("vy", tmpvy + tmpvy2/parts*0.2, i)
    end
end

elements.property(vcln, "Update", funcUpdate)

local vcln2 = elements.allocate("mymod", "VCLN2")
elements.element(vcln2, elements.element(elements.DEFAULT_PT_DMND))
elements.property(vcln2, "Name", "VCL#")
elements.property(vcln2, "Color", 0xffc0c0c0)

local function funcUpdate2(i,x,y,s,nt)
    tmpvx2 = 0; tmpvy2 = 0; parts = 0
    for r in sim.neighbors(x,y,1,1) do
        if sim.partProperty(r, "type") == elem.DEFAULT_PT_PHOT then
            parts = parts + 1; tmpvx2 = tmpvx2 + sim.partProperty(r, "vx"); tmpvy2 = tmpvy2 + sim.partProperty(r, "vy"); tpt.delete(r)
        end
    end
    if (parts ~= 0) then
        tpt.set_property("vx", tmpvx2/parts, i)
        tpt.set_property("vy", tmpvy2/parts, i)
        tpt.set_property("type", vcln, i)
    end
end

elements.property(vcln2, "Update", funcUpdate2)
